import { AbstractControl, ValidatorFn } from '@angular/forms';


export function forbiddenNameValidator(servicios: IServicio[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = [];
    if (servicios && servicios.length > 0) {
      forbidden = servicios.filter(o => o.descripcion.toLocaleLowerCase() == control.value.toLocaleLowerCase());
     
      
      return forbidden.length > 0 ? { 'forbiddenName': { value: control.value } } : null;
    }
  };
}