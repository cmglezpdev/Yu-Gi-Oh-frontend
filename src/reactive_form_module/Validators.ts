import type { AbstractControl } from "./AbstractControl";

export default  class Validators {
  public static required = (param: AbstractControl) => {
    if (param.realValue.value == null) {
      return { 'required': true }
    }
    return null
  }

  public static email = (param: AbstractControl) => {
    if (typeof param.value == 'string' && isValidEmail(param.value)) {
      return null
    }
    return { 'email': true };
  }

  public static min = (min: number) => (param: AbstractControl) => {
    if (typeof param.value === 'number' && param.value >= min) {
      return null
    }
    return { 'min': true };
  }

  public static minLength = (min: number) => (param: AbstractControl) => {
    if (typeof param.value === 'string' && param.value.length >= min) {
      return null;
    }
    return { 'minlength': true };
  }

  public static passwordMatch = (cb:()=>boolean)=>(param:AbstractControl)=>{
    if(cb())
     {
     return null;
    }else{
    return { 'passwordmatch': true };
    }
  }

}


function isValidEmail(email: string): boolean {
  // Expresión regular para validar el formato de un correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Probamos el string con la expresión regular y devolvemos el resultado
  return emailRegex.test(email);
}
