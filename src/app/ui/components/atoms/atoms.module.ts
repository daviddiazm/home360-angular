import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { ButtonSubmitComponent } from './button-submit/button-submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoSelectComponent } from '../molecules/auto-select/auto-select.component';


@NgModule({
  declarations: [
    InputTextComponent,
    TextAreaComponent,
    ButtonSubmitComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputTextComponent,
    TextAreaComponent,
    ButtonSubmitComponent,
  ]
})
export class AtomsModule { }
