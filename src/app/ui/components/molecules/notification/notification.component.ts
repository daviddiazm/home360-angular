import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'warning' | 'error' = 'success';
  visible = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = false;
    }, 5000);
  }

  getColorClass(): string {
    switch (this.type) {
      case 'success':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      default:
        return 'green';
    }
  }
}
