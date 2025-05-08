import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, of, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-auto-select',
  templateUrl: './auto-select.component.html',
  styleUrls: ['./auto-select.component.scss']
})
export class AutoSelectComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Seleccionar...';
  @Input() label?: string
  @Output() selected = new EventEmitter<string>();

  inputControl = new FormControl('');
  filteredOptions$: Observable<string[]> = of([]);
  isFocus: boolean = false

  ngOnInit() {
    this.filteredOptions$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this.filter(value || ''))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onBlur() {
    setTimeout(() => {
      this.isFocus = false;
    }, 200);
  }


  selectOption(option: string) {
    this.inputControl.setValue(option);
    this.selected.emit(option);
    this.isFocus = true
  }
}
