import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() errorMessage: string | null = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isDisable: boolean = false;

  value: string = '';

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // setDisabledState?(disabled: boolean): void {
  //   this.disabled = disabled;
  // }
  // setDisabledState?(isDisable: boolean): void {
  //   this.isDisable = isDisable;
  // }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

}
