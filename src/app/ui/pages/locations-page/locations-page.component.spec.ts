import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationsPageComponent } from './locations-page.component';
import { LocationService } from '../../../core/services/location.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Department } from 'src/app/core/models/department.interface';
import { City } from 'src/app/core/models/city.interface';
import { NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { MapNameDepartmentPipe } from '../../../shared/pipes/department-map-name.pipe';

@Pipe({ name: 'mapNameDep' })
class MockMapNameDepartmentPipe {
  transform(value: any): any {
    return value;
  }
}


describe('LocationsPageComponent', () => {
  let component: LocationsPageComponent;
  let fixture: ComponentFixture<LocationsPageComponent>;
  let serviceMock: jest.Mocked<LocationService>;
  let formBuilder: FormBuilder;

  const mockDepartments: Department[] = [
    { id: 1, name: 'Department 1', description: 'Desc 1' },
    { id: 2, name: 'Department 2', description: 'Desc 2' }
  ];

  const mockCities: City[] = [
    { id: 1, name: 'City 1', description: 'Desc 1', departmentId: 1 },
    { id: 2, name: 'City 2', description: 'Desc 2', departmentId: 1 }
  ];

  beforeEach(() => {
    serviceMock = {
      getDepartments: jest.fn().mockReturnValue(of(mockDepartments)),
      getNameDepartments: jest.fn(),
      getCitiesByDepartment: jest.fn(),
      getNameMunicipalities: jest.fn(),
      getAllCities: jest.fn(),
      postLocation: jest.fn()
    } as unknown as jest.Mocked<LocationService>;

    TestBed.configureTestingModule({
      declarations: [LocationsPageComponent, MockMapNameDepartmentPipe],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: LocationService, useValue: serviceMock },
        { provide: MapNameDepartmentPipe, useClass: MockMapNameDepartmentPipe }
      ]
    });

    fixture = TestBed.createComponent(LocationsPageComponent);
    const formBuilder = TestBed.inject(FormBuilder);
    component = new LocationsPageComponent(serviceMock, formBuilder);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
