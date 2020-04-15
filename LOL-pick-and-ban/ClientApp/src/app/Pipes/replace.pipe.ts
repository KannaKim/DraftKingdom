import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(origin:string,replace:string,replace_to:string): string {
    return origin.replace(replace,replace_to)
  }

}
