import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

export enum DEFAULT_CALC_BUTTONS {
  SIGN = '+/-',
  DOT = '.',
}

export enum DEFAULT_OPERATION {
  MINUS = '-',
  PLUS = '+',
  DIVIDER = '/',
  MULTIPLY = '*',
}

@Component({
  selector: 'app-default-calculator',
  templateUrl: './default-calculator.component.html',
  styleUrls: ['./default-calculator.component.scss']
})
export class DefaultCalculatorComponent implements OnInit {

  public calcControl = new FormControl();

  public buttons: Array<string | number> = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
    DEFAULT_CALC_BUTTONS.DOT, 0, DEFAULT_CALC_BUTTONS.SIGN,
  ]

  public operations: Array<DEFAULT_OPERATION> = [

  ]

  @ViewChild('calcView') calcView!: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const numberCode = event.key.charCodeAt(0);
    if (numberCode >= '0'.charCodeAt(0) && numberCode <= '9'.charCodeAt(0) || event.key === '.') {
      this.calcView.nativeElement?.focus()
    }
    if (event.key === '.' && this.calcControl.value?.includes('.')) {
      event.preventDefault()
    }
    console.log('handle', event)
  }

  constructor() { }

  public ngOnInit(): void {
    this.initOnChangeControl()
  }

  public initOnChangeControl() {
    this.calcControl.registerOnChange(() => {
      console.log('on changeeeee', this.calcControl.value)
    })
    this.calcControl.valueChanges.subscribe(value => {
      console.log('on change', value, this.calcControl.value)
      if (value) {
        this.calcControl.patchValue(value.toString(), { emitEvent: false, onlySelf: true })
      }
    })
  }


  public addNumberToEnd(value: number) {
    this.calcControl.patchValue((this.calcControl.value?.toString() ?? 0) + value)
  }

  public changeSign() {
    this.calcControl.patchValue(-this.calcControl.value)
  }

  public addDot() {
    if (!this.calcControl.value?.includes(DEFAULT_CALC_BUTTONS.DOT)) {
      this.calcControl.patchValue(this.calcControl.value ?? '' + '.')
    }
  }

  public onClickButton(button: string | number) {
    if (typeof button === 'number') {
      this.addNumberToEnd(button);
    }

    switch (button) {
      case DEFAULT_CALC_BUTTONS.SIGN:
        this.changeSign()
        break;
      case DEFAULT_CALC_BUTTONS.DOT:
        this.addDot()
        break;
    }
  }
}
