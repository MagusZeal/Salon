import { AbstractControl, ValidatorFn } from '@angular/forms';


export function forbiddenNameValidator(clientes: ICliente[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = [];
    if (clientes && clientes.length > 0) {
      forbidden = clientes.filter(o => o.nombre.toLocaleLowerCase() == control.value.toLocaleLowerCase());
      console.log(forbidden);
    
      return forbidden.length > 0 ?  null: { 'forbiddenName': { value: control.value } };
    }
  };
}