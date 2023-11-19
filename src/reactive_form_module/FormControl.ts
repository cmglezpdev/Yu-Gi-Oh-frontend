import { ref, watch } from "vue";
import { AbstractControl } from "./AbstractControl";
import type { ValidatorFn } from "./ValidatorFn";

type FormControlInputType = { [key: string]: any };

export default class FormControl extends AbstractControl {

  public validators: ValidatorFn[] = []

  constructor(value: FormControlInputType, validators?: ValidatorFn[]) // se espera un objeto de tipo {identificador: valor por defecto}
  {
    super(Object.keys(value)[0]);
    this.realValue = ref(value[this.identifyer])
    this.value = this.realValue.value;
    this.validators = validators ? validators : [];
    this.valid.value = this.checkValidity();
    watch(this.realValue, () => {
      this.touched.value = true;
      this.value = this.realValue.value;
      this.valid.value = this.checkValidity();
      this.onValueChange(this.value);
    })

  }

  public addValidator(validator: ValidatorFn): void {
    this.validators.push(validator);
  }

  public override patchValue(obj: any): void {
    if (Object.keys(obj).includes(this.identifyer)) {
      this.setValue(obj[this.identifyer]);
    }
  }
  public override setValue(newVal: any): void {
    this.realValue = newVal;
  }
  public override get(_identifyer: string): any {
    return this.realValue.value
  }

  public get_identifyer(): string {
    return this.identifyer;
  }


  protected checkValidity(): boolean {
    let validity = true;
    this.errorStack = [];
    this.validators.forEach(validator => {
      const resp = validator(this);
      if (resp != null) {
        validity = validity && false;
        this.errorStack.push(resp);
      }
    })

    return this.touched.value && validity;
  }
}
