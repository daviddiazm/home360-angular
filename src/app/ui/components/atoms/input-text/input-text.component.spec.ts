import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextComponent]
    });
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write a value', () => {
    component.writeValue('Test value');
    expect(component.value).toBe('Test value');
  });

  it('should update value and call both callbacks', () => {
    const changeFn = jest.fn();
    const touchedFn = jest.fn();
    component.registerOnChange(changeFn);
    component.registerOnTouched(touchedFn);
    component.onChange('updated');
    expect(changeFn).toHaveBeenCalledWith('updated');
  });

  it('should register the onTouched callback', () => {
    const mockFn = jest.fn();
    component.registerOnTouched(mockFn);
    component.onChange('new value');
  });

  it('should register the onChange callback', () => {
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);

    component.onChange('new value');

    expect(mockFn).toHaveBeenCalledWith('new value');
  });

  it('should exist handle and set value', () => {
    const text = 'Texto de prueba'
    const mockEvent: Event = {
      target: { value: text } as HTMLInputElement,
    } as unknown as Event ;

    component.handleInput(mockEvent)
    expect(component.value).toBe(text)
  })

});
