import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsPageComponent } from './locations-page.component';

describe('LocationsPageComponent', () => {
  let component: LocationsPageComponent;
  let fixture: ComponentFixture<LocationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsPageComponent]
    });
    fixture = TestBed.createComponent(LocationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
