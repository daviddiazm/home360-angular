import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss']
})
export class ButtonSubmitComponent {
  @Input() value: string = ''
  @Input() disabled: boolean = false
}
