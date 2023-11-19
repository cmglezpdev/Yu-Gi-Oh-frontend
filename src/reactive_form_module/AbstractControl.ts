import { ref, type Ref } from "vue";
import type { RefValue } from "vue/macros";

export abstract class AbstractControl {
  public touched = ref(false);
  public valid = ref(false);
  public enabled = ref(true);
  protected identifyer: string;
  public realValue: RefValue<any> = ref(null);
  protected onValueChangeCallbacks: ((param: any) => any)[] = [];
  protected errorStack: string[] = [];

  public value: any;

  public touch() {
    if (typeof this.touched == 'boolean') {
      this.touched = true;
    } else {
      this.touched.value = true;
    }
  }

  public hasError(errorName: string): boolean {
    return this.errorStack.some((err: any) => err[errorName]);
  }

  constructor(identifyer: string) {
    this.identifyer = identifyer;
  }

  public enable(): void {
    if (typeof this.enabled == 'boolean') {
      this.enabled = true;
    } else {
    this.enabled.value = true;
    }
  }

  public disable(): void {
    if (typeof this.enabled == 'boolean') {
      this.enabled = false;
    } else {
    this.enabled.value = false;
    }
  }

  public abstract patchValue(obj: any): void;
  public abstract setValue(newVal: any): void;
  public abstract get(identifyer: string): any;
  protected abstract checkValidity(): boolean;

  protected onValueChange(newVal: any): void {
    this.touched.value = true;
    for (let callback of this.onValueChangeCallbacks) {
      callback(newVal);
    }
  }

  public valueChange(param: (param: any) => any) {
    this.onValueChangeCallbacks.push(param);
  }

  public get_identifyer(): string {
    return this.identifyer;
  }
}
