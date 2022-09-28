import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: any, first: string, second: string = ''): unknown {
    return value = `${first} ${second}`;
  }
}
