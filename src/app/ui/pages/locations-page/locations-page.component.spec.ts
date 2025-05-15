import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LocationsPageComponent } from './locations-page.component';
import { LocationService } from '../../../core/services/location.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Department } from 'src/app/core/models/department.interface';
import { City } from 'src/app/core/models/city.interface';
import { MoleculesModule } from '../../components/molecules/molecules.module';
import { OrganismsModule } from '../../components/organisms/organisms.module';
import { AtomsModule } from '../../components/atoms/atoms.module';
import { ResponceUsualMessage } from '../../../shared/interfaces/responceUsualMessage.interface';


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
      getCitiesByDepartment: jest.fn().mockReturnValue(of(mockCities)),
      getNameMunicipalities: jest.fn(),
      getAllCities: jest.fn(),
      postLocation: jest.fn()
    } as unknown as jest.Mocked<LocationService>;

    TestBed.configureTestingModule({
      declarations: [LocationsPageComponent],
      imports: [ReactiveFormsModule, MoleculesModule, OrganismsModule, AtomsModule],
      providers: [
        FormBuilder,
        { provide: LocationService, useValue: serviceMock },
      ]
    });

    fixture = TestBed.createComponent(LocationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.locationForm).toBeDefined();
    expect(component.locationForm.get('department')).toBeTruthy();
    expect(component.locationForm.get('city')).toBeTruthy();
    expect(component.locationForm.get('location')).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.locationForm).toBeDefined();
    expect(component.locationForm.get('department')).toBeTruthy();
    expect(component.locationForm.get('city')).toBeTruthy();
    expect(component.locationForm.get('location')).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getDepartments on initialization', () => {
      expect(serviceMock.getDepartments).toHaveBeenCalled();
    });

    it('should populate departments array and names', () => {
      component.ngOnInit();
      expect(component.departments).toEqual(mockDepartments);
      expect(component.departmentsName).toEqual(['Department 1', 'Department 2']);
    });

    it('should NOT call onDepartmentSelected when department value is set to null programmatically', () => {
      const onDepartmentSelectedSpy = jest.spyOn(component, 'onDepartmentSelected');
      component.locationForm.get('department')?.setValue(null);
      expect(onDepartmentSelectedSpy).not.toHaveBeenCalled();
    });


    it('should NOT call onCitySelected when city value is set to null programmatically', () => {
      const onCitySelectedSpy = jest.spyOn(component, 'onCitySelected');
      component.locationForm.get('city')?.setValue(null);
      expect(onCitySelectedSpy).not.toHaveBeenCalled();
    });

    it('should call onCitySelected when city value changes to a non-null value', () => {
      const onCitySelectedSpy = jest.spyOn(component, 'onCitySelected');
      const newValue = 'City 1';

      component.locationForm.get('city')?.setValue(newValue);

      expect(onCitySelectedSpy).toHaveBeenCalledWith(newValue);
    });

    it('should call onDepartmentSelected when department value changes to a non-null value', () => {
      const onDepartmentSelectedSpy = jest.spyOn(component, 'onDepartmentSelected');
      const newValue = 'SomeDepartment';

      component.locationForm.get('department')?.setValue(newValue);

      expect(onDepartmentSelectedSpy).toHaveBeenCalledWith(newValue);
    });

  });

  describe('getCities', () => {
    it('should call getCitiesByDepartment and populate cities array', () => {
      component.getCities(1);
      expect(serviceMock.getCitiesByDepartment).toHaveBeenCalledWith(1);
      expect(component.cities).toEqual(mockCities);
      expect(component.citiesName).toEqual(['City 1', 'City 2']);
    });
  });

  describe('onDepartmentSelected', () => {
    it('should reset city value when department changes', () => {
      component.locationForm.get('city')?.setValue('City 1');
      component.onDepartmentSelected('Department 1');
      expect(component.locationForm.get('city')?.value).toBe('');
    });

    it('should start onCitySelceted whit undefine values', () => {
      const spy = jest.spyOn(component, 'onCitySelected')
      component.departments = []
      component.ngOnInit()
      component.onDepartmentSelected('value')
      expect(spy).not.toHaveBeenCalled()
    })
  });

  describe('onCitySelected', () => {
    it('should set cityId when city is selected', () => {
      component.cities = mockCities;
      component.onCitySelected('City 1');
      expect(component.cityId).toBe(1);
    });
  });


  describe('createLocation', () => {

    it('should call postLocation and reset form when valid data is provided', fakeAsync(() => {

      const mockResponse: ResponceUsualMessage = { message: 'mesnaje por default', localDate: '' };
      serviceMock.postLocation.mockReturnValue(of(mockResponse));

      component.cityId = 123;
      component.locationForm.get('location')!.setValue('New Location');

      component.createNewLocation();

      expect(serviceMock.postLocation).toHaveBeenCalledWith('New Location', 123);
      expect(component.saveIsSucces).toBe(true);
      expect(component.locationForm.get('location')!.value).toBeNull();
    }));

    it('should handle error when postLocation fails', fakeAsync(() => {
      const mockError = { status: 500, message: 'Server error' };
      serviceMock.postLocation.mockReturnValue(throwError(() => mockError));
      console.error = jest.fn();

      component.cityId = 123;
      component.locationForm.get('location')!.setValue('New Location');

      component.createNewLocation();

      expect(serviceMock.postLocation).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error al guardar:', mockError);
      expect(console.error).toHaveBeenCalledWith('Código de estado HTTP:', 500);
      expect(component.saveIsSucces).toBe(false);
    }));

  })

  describe('onSubmit', () => {

    // it('should call marckAsTouched and createLocation whean values are valid ', () => {
    //   const spyFrom = jest.spyOn(component.locationForm, 'markAllAsTouched')
    //   const spyCreateLocation = jest.spyOn(component, 'createNewLocation')
    //   component.locationForm.get('department')?.setValue('department')
    //   component.locationForm.get('city')?.setValue('city')
    //   component.locationForm.get('location')?.setValue('location')
    //   component.cityId = 1
    //   component.onSubmit()

    //   expect(spyFrom).toHaveBeenCalled()
    //   expect(spyCreateLocation).toHaveBeenCalled()
    // })
    it('should call markAsTouched and createLocation when values are valid', () => {
      const mockResponse = { message: 'Success', localDate: '' };
      serviceMock.postLocation.mockReturnValue(of(mockResponse));

      component.locationForm.get('department')?.setValue('department');
      component.locationForm.get('city')?.setValue('city');
      component.locationForm.get('location')?.setValue('location');
      component.cityId = 1;

      const spyForm = jest.spyOn(component.locationForm, 'markAllAsTouched');
      const spyCreateLocation = jest.spyOn(component, 'createNewLocation');

      component.onSubmit();

      expect(spyForm).toHaveBeenCalled();
      expect(spyCreateLocation).toHaveBeenCalled();
    });
  })

  it('should set errorMessage when cityId no exist', () => {
    component.locationForm.get('department')?.setValue('department');
    component.locationForm.get('city')?.setValue('city');
    component.locationForm.get('location')?.setValue('location');
    component.cityId = undefined;
    component.onSubmit()
    expect(component.errorMessage).toBe('Porfavor ingresar una ubicacion valida')
  })



});
