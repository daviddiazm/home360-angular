import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-dialog',
  templateUrl: './button-dialog.component.html',
  styleUrls: ['./button-dialog.component.scss']
})
export class ButtonDialogComponent {
  @Input() value: string = ''
  @Input() disabled: boolean = false

  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
