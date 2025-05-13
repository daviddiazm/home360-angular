import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextSelectComponent } from './input-text-select.component';

describe('InputTextSelectComponent', () => {
  let component: InputTextSelectComponent;
  let fixture: ComponentFixture<InputTextSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextSelectComponent]
    });
    fixture = TestBed.createComponent(InputTextSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the internal value', () => {
    const testValue = 'test value';
    component.writeValue(testValue);
    expect(component.value).toBe(testValue);
  });

  it('should register the onChange callback', () => {
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);
    component.onChange('new value');
    expect(mockFn).toHaveBeenCalledWith('new value');
  });


  it('should set the disabled state', () => {
    component.setDisabledState(true)
    expect(component.isDisabled).toBe(true);

    component.setDisabledState(false);
    expect(component.isDisabled).toBe(false);
  });

  describe('updateValue', () => {
    it('should update value and call both callbacks', () => {
      const changeFn = jest.fn();
      const touchedFn = jest.fn();
      component.registerOnChange(changeFn);
      component.registerOnTouched(touchedFn);
    });
  });


  describe('setDisabledState', () => {
    it('should set the disabled state', () => {
      component.setDisabledState(true);
      expect(component.isDisabled).toBe(true);

      component.setDisabledState(false);
      expect(component.isDisabled).toBe(false);
    });
  });



});
