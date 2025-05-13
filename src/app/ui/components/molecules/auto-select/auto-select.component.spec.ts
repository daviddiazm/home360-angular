import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSelectComponent } from './auto-select.component';
import { Component, Input } from '@angular/core';
import { InputTextSelectComponent } from '../../atoms/input-text-select/input-text-select.component';
import { ReactiveFormsModule } from '@angular/forms';
describe('AutoSelectComponent', () => {
  let component: AutoSelectComponent;
  let fixture: ComponentFixture<AutoSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AutoSelectComponent,
        InputTextSelectComponent // Componente real
      ],
      imports: [
        ReactiveFormsModule // Necesario para formControl
      ]
    });
    fixture = TestBed.createComponent(AutoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
