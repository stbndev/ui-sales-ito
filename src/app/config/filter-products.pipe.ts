// import { Pipe, PipeTransform } from '@angular/core';
// @Pipe({
//   name: 'filterProducts'
// })
// export class FilterProductsPipe implements PipeTransform {

//   transform(value: any, ...args: any[]): any {
//     return null;
//   }

// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  // transform(value: any, ...args: any[]): any {
  //   return null;
  // }
  transform(objects: any[]): any[] {
    if (objects) {
      return objects.filter(object => {
        return object.data.type === 1;
      });
    }
  }
}
