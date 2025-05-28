import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHouseComponent } from './card-house.component';

describe('CardHouseComponent', () => {
  let component: CardHouseComponent;
  let fixture: ComponentFixture<CardHouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardHouseComponent]
    });
    fixture = TestBed.createComponent(CardHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
