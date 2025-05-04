import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy, OnChanges {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() duration: number = 5000; // Duración en milisegundos (5s por defecto)

  progressWidth: number = 100;
  private timerSub!: Subscription;
  private intervalSub!: Subscription;
  isVisible: boolean = false;

  ngOnInit() {
    this.showNotification();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && changes['message'].currentValue) {
      this.showNotification();
    }
  }

  showNotification() {
    this.isVisible = true;
    this.progressWidth = 100;

    // Cancelar cualquier suscripción previa
    this.clearSubscriptions();

    // Temporizador para ocultar la notificación
    this.timerSub = timer(this.duration).subscribe(() => {
      this.isVisible = false;
    });

    // Animación de la barra de progreso
    const intervalDuration = 50;
    const steps = this.duration / intervalDuration;
    const decrement = 100 / steps;

    this.intervalSub = timer(0, intervalDuration).subscribe((step) => {
      this.progressWidth = 100 - (decrement * step);
      if (this.progressWidth <= 0) {
        this.intervalSub.unsubscribe();
      }
    });
  }

  clearSubscriptions() {
    if (this.timerSub) this.timerSub.unsubscribe();
    if (this.intervalSub) this.intervalSub.unsubscribe();
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  get notificationClass() {
    return {
      'notification-success': this.type === 'success',
      'notification-error': this.type === 'error',
      'notification-info': this.type === 'info'
    };
  }
}
