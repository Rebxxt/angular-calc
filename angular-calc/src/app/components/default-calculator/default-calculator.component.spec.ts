import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCalculatorComponent } from './default-calculator.component';

describe('DefaultCalculatorComponent', () => {
  let component: DefaultCalculatorComponent;
  let fixture: ComponentFixture<DefaultCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
