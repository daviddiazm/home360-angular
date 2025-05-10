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
});
