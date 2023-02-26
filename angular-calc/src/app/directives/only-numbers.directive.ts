import {Directive, HostListener, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() { }

  @Input() onlyNumbers: boolean = false;

  @Input() formControl!: FormControl;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const numberCode = event.key.charCodeAt(0);
    if (numberCode >= '0'.charCodeAt(0) && numberCode <= '9'.charCodeAt(0)) {
      return
    }
    if (numberCode === ','.charCodeAt(0) || numberCode === '.'.charCodeAt(0)) {
      if (this.formControl.value && !this.formControl.value.includes('.')) {
        this.formControl.patchValue(this.formControl.value + '.')
      }
    }

    if (event.code === 'F5') {
      this.formControl.reset()
    }
    if (event.code === 'Backspace') {
      return
    }
    event.preventDefault()
  }

}
