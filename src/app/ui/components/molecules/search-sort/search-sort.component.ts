import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-sort',
  templateUrl: './search-sort.component.html',
  styleUrls: ['./search-sort.component.scss']
})
export class SearchSortComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<boolean>();
  @Input()  placeholder: string = 'Buscar...'

  searchControl = new FormControl('');
  isAscending: boolean = true;

  ngOnInit() {
    this.setupSearchDebounce();
  }

  private setupSearchDebounce() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(term => {
      this.searchChange.emit(term ?? '');
    });
  }

  onSort() {
    this.isAscending = !this.isAscending;
    this.sortChange.emit(this.isAscending);
  }
}
