import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent]
    });
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "green" class for success type', () => {
    component.type = 'success';
    expect(component.getColorClass()).toBe('green');
  });

  it('should return "yellow" class for warning type', () => {
    component.type = 'warning';
    expect(component.getColorClass()).toBe('yellow');
  });

  it('should return "red" class for error type', () => {
    component.type = 'error';
    expect(component.getColorClass()).toBe('red');
  });
});
