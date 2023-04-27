import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSplitting'
})
export class TextSplittingPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string): string {
    const splitBy = '@'
    const splittedText = value.split( splitBy );

    return `<div class="row"><div class="col-3">${ splittedText[0]  }</div><div class="col-5">${ splittedText[1].length>10 ? splittedText[1]+ '...'  : splittedText[1] }</div><div class="col-4">${ splittedText[2].length>10 ? splittedText[2]+ '...'  : splittedText[2] }</div></div>`;
    //return `${ splittedText[0] } ${ splitBy } <br> <b>${ splittedText[1] }</b>`;
  }

}

// `<div class="row"><div class="col-6">${ splittedText[0] }</div><div class="col-6">${ splittedText[1] }</div><div class="col-6">${ splittedText[2] }</div></div>`
