import { reactive, type Ref } from "vue";
import { AbstractControl } from "./AbstractControl";
import type FormControl from "./FormControl";

export default class FormGroup extends AbstractControl {

  public controls: AbstractControl[];

  constructor(controls: AbstractControl[], name?: string,) {
    super(name ? name : '');
    this.controls = controls;
    this.realValue = reactive(controls);
    this.value = this.buildValue();
    this.valid.value = this.checkValidity();
    for (let control of this.controls) {
      control.valueChange(
        (_param) => {
          this.onValueChange(null);
          this.value = this.buildValue();
          this.valid.value = this.checkValidity();
          this.touched.value = true;
        }
      )
    }
  }

  public override disable(): void {
    for(let control of this.realValue)
    {
      control.disable();
    }
  }

  public override enable(): void {
    for(let control of this.realValue)
    {
      control.enable();
    }
  }

  private buildValue(): any {
    const ret_val: any = {};
    for (let control of this.controls) {
      ret_val[control.get_identifyer()] = control.value;
    }
    return ret_val;
  }

  public override patchValue(obj: any): void {
    const identifyers = Object.keys(obj);
    for (let identifier of identifyers) {
      this.get(identifier)?.setValue(obj[identifier]);
    }
  }
  public override setValue(newVal: FormControl[]): void {
    this.controls = newVal;
  }

  public override get(identifyer: string): AbstractControl | undefined {
    return this.realValue.find((control: any) => control.get_identifyer() === identifyer);
  }


  protected checkValidity(): boolean {
    let validity = true;
    this.controls.forEach(control => {
      validity = validity && control.valid.value;
    })
    return this.touched.value && validity;
  }
}
