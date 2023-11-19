import type { AbstractControl } from "./AbstractControl";

export type ValidatorFn = (param:AbstractControl)=> string | null; //if there is an error return erroename , else return null
