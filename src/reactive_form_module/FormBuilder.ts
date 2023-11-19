import  { AbstractControl } from "./AbstractControl";
import  FormControl  from "./FormControl";
import  FormGroup  from "./FormGroup";
import type { ValidatorFn } from "./ValidatorFn";

type GroupBuilderType =
{
[key: string]: [any,ValidatorFn[]] | AbstractControl
}

export default class FormBuilder
{
  public group(input:GroupBuilderType):FormGroup
  {
    let formControls:AbstractControl[] =[];
     for(let controlsName in input)
     {
      const control = input[controlsName]
        if(control instanceof AbstractControl){
         formControls.push(control);
      }else{
        let value:any={};
        value[controlsName]=control[0];
        formControls.push(
          new FormControl(value,control[1]? control[1]:[])
        )
      }
     }
    return new FormGroup(formControls);
  }
}
