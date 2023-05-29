import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMateria'
})
export class FilterMateriaPipe implements PipeTransform {

  transform(value: any, ...arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultadoTeachers = [];
    for(const teacher of value) {
      if(teacher.materia.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoTeachers.push(teacher);
      }
    }
    return resultadoTeachers;
  }

}
