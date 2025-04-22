import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readObject',
})
export class ReadObjectPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let keys = args[0].split('.');
    // let ans = value;
    for (const key of keys) {
      value = value[key];
    }
    return value;
  }
}
