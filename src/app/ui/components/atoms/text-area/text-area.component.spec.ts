import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaComponent]
    });
    fixture = TestBed.createComponent(TextAreaComponent);
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

  it('should update the component\'s value property with the input value', () => {
    const mockEvent = {
      target: { value: 'test input' } as HTMLInputElement,
    } as unknown as Event;

    component.handleInput(mockEvent);

    expect(component.value).toBe('test input');
  });
});
