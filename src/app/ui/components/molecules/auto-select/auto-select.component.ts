import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-auto-select',
  templateUrl: './auto-select.component.html',
  styleUrls: ['./auto-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoSelectComponent),
      multi: true
    }
  ]
})

export class AutoSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Seleccionar...';
  @Input() label?: string;
  @Input() disable: boolean = false;
  @Input() required: boolean = false;

  inputControl = new FormControl('');
  filteredOptions$: Observable<string[]> = of([]);
  isFocus: boolean = false;

  onChange = (value: string | null) => {};
  onTouched = () => {};

  ngOnInit() {
    this.filteredOptions$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this.filter(value ?? ''))
    );
    this.inputControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.initFilter();
    }
  }
  initFilter() {
    this.filteredOptions$ = this.inputControl.valueChanges.pipe(
      startWith(this.inputControl.value ?? ''),
      debounceTime(300),
      map(value => this.filter(value ?? ''))
    );
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onBlur() {
    setTimeout(() => {
      this.isFocus = false;
      this.onTouched();
    }, 200);
  }

  selectOption(option: string) {
    this.inputControl.setValue(option);
    this.isFocus = true;
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.inputControl.setValue(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.disableInput() : this.enableInput();
  }

  disableInput(): void {
    this.inputControl.disable();
  }

  enableInput(): void {
    this.inputControl.enable();
  }

}
