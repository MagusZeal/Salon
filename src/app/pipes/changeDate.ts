import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'changeDate'})
export class ChangeDate implements PipeTransform {
  transform(value: any): any {
    console.log(value);
    
       return  ( value.substring(6, 10) + '-'+ value.substring(3, 5) + '-' + value.substring(0, 2))
  }
}