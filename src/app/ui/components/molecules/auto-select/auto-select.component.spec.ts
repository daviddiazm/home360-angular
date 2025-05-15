import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AutoSelectComponent } from './auto-select.component';
import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { InputTextSelectComponent } from '../../atoms/input-text-select/input-text-select.component';
import { ReactiveFormsModule } from '@angular/forms';
describe('AutoSelectComponent', () => {
  let component: AutoSelectComponent;
  let fixture: ComponentFixture<AutoSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AutoSelectComponent,
        InputTextSelectComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    });
    jest.useFakeTimers();
    fixture = TestBed.createComponent(AutoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected value', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);

    component.selectOption('Test');

    expect(component.inputControl.value).toBe('Test');
    expect(mockOnChange).toHaveBeenCalledWith('Test');
  });

  it('should update filtered options when input options change', () => {
    const newOptions = ['New', 'Options'];
    component.options = newOptions;
    component.ngOnChanges({ options: { currentValue: newOptions } as SimpleChange });

    component.filteredOptions$.subscribe(filtered => {
      expect(filtered).toEqual(newOptions);
    });
  });

  it('should update filtered options when input options change', () => {
    const newOptions = ['New', 'Options'];
    component.options = newOptions;
    component.ngOnChanges({ options: { currentValue: newOptions } as SimpleChange });

    component.filteredOptions$.subscribe(filtered => {
      expect(filtered).toEqual(newOptions);
    });
  });

  it('should wloud be called onTouch after 200mls onBlur', () => {
    const spyOnTouch = jest.spyOn(component, 'onTouched')
    component.onBlur()
    expect(spyOnTouch).not.toHaveBeenCalled()
    jest.advanceTimersByTime(200);
    expect(spyOnTouch).toHaveBeenCalled()
  })

  it('should wloud set focus value onBlur', () => {
    const spyOnTouch = jest.spyOn(component, 'onTouched')
    component.onBlur()
    expect(spyOnTouch).not.toHaveBeenCalled()
    jest.advanceTimersByTime(200);
    expect(component.isFocus).toBe(false)
    expect(spyOnTouch).toHaveBeenCalled()
  })

  it('should update values when filter', () => {
    const newOptions = ['New', 'Options'];
    const mockValue = 'new'


  })

  it('should return an empty array if the input is empty', () => {
    component.options = ['Apple', 'Banana', 'Orange', 'Grape'];
    const result = component.filter('');
    expect(result).toEqual(['Apple', 'Banana', 'Orange', 'Grape']);
  });
});
