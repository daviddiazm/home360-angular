import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { map, Observable, Subscription } from 'rxjs';
import { Department } from 'src/app/core/models/department.interface';
import { City } from 'src/app/core/models/city.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/form-util';
import { Location } from 'src/app/core/models/location.interfaces';
import { Page } from 'src/app/core/models/page.interface';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit, OnDestroy {
  FormUtils = FormUtils

  constructor(
    private readonly locationService: LocationService,
    private readonly formBuilder: FormBuilder
  ) { }


  locationForm = this.formBuilder.group({
    department: ['', [Validators.required]],
    city: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  })

  subscription = new Subscription()
  saveIsSucces: boolean = false
  errorMessage?: string
  cityId?: number
  departments: Department[] = []
  departmentsName: string[] = []
  departments$?: Observable<Department[]>

  cities: City[] = []
  citiesName: string[] = []
  cities$?: Observable<City[]>

  currentPage: number = 0
  pageSize: number = 10
  orderAsc: boolean = true
  totalPages = 0
  searchTerm: string = ''
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'sector', label: 'Sector' },
    { key: 'municipalityName', label: 'Ciudad' },
    { key: 'deparmentName', label: 'Departamento' }
  ];

  pageNumbers: number[] = [];
  locationsPage$?: Observable<Page<Location>>
  locationsRefinated: Location[] = []

  ngOnInit(): void {
    this.getDepartments()

    const cityFormChangesSubscription = this.locationForm.get('city')?.valueChanges.subscribe(value => {
      if (value) this.onCitySelected(value)
    })
    this.subscription.add(cityFormChangesSubscription)

    const departmentFormChangesSubscription = this.locationForm.get('department')?.valueChanges.subscribe(value => {
      if (value) this.onDepartmentSelected(value)
    })
    this.subscription.add(departmentFormChangesSubscription)

    this.loadLocations();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getDepartments() {
    this.departments$ = this.locationService.getDepartments()
    const getDepartmentsSubscription = this.departments$.subscribe(departments => {
      this.departments = departments
      this.departmentsName = this.departments.map(d => d.name)
    })
    this.subscription.add(getDepartmentsSubscription)
  }

  getCities(idDepartment: number) {
    this.cities$ = this.locationService.getCitiesByDepartment(idDepartment)
    const getCitiesByDepartmentIdsSubscription = this.cities$.subscribe((cities) => {
      this.cities = cities
      this.citiesName = cities.map(city => city.name)
    })
    this.subscription.add(getCitiesByDepartmentIdsSubscription)
  }

  onDepartmentSelected(departmentName: string) {
    const departmentSelected = this.departments.find(department => department.name == departmentName);
    if (departmentSelected) this.getCities(departmentSelected?.id)
    if (this.locationForm.get('city')?.value) {
      this.locationForm.get('city')?.setValue('')
    }
  }

  onCitySelected(cityName: string) {
    const citySelected = this.cities.find(city => city.name == cityName)
    if (citySelected) {
      this.cityId = citySelected.id
    }
  }

  createNewLocation() {
    const locationValue = this.locationForm.get('location')!.value;
    if (locationValue !== null && locationValue !== '' && this.cityId) {
      this.locationService.postLocation(locationValue, this.cityId).subscribe({
        next: (res) => {
          console.log("Guardado exitosamente:", res);
          this.saveIsSucces = true
          this.locationForm.reset()
        },
        error: (err) => {
          console.error("Error al guardar:", err);
          console.error("Código de estado HTTP:", err.status);
        }
      });
    }
  }

  onSubmit() {
    this.locationForm.markAllAsTouched()
    if (!this.cityId) {
      this.errorMessage = 'Porfavor ingresar una ubicacion valida'
    }
    if (this.locationForm.valid && this.cityId) {
      this.createNewLocation()
    }
  }

  loadLocations() {
    this.locationsPage$ = this.locationService.getPaginatedLocation(
      this.currentPage,
      this.pageSize,
      this.orderAsc,
      this.searchTerm
    ).pipe(
      map(page => {
        this.pageNumbers = [];
        this.totalPages = page.totalPages
        for (let i = 0; i < page.totalPages; i++) {
          this.pageNumbers.push(i);
        }
        return {
          ...page,
          content: page.content.map(location => ({
            ...location,
            municipalityName: location.municipalityModel.name,
            deparmentName: location.municipalityModel.departmentModel.name
          }))
        };
      })
    );
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 0;
    this.loadLocations();
  }

  onSort(ascending: boolean) {
    this.orderAsc = ascending;
    this.loadLocations();
  }

  onPageCahnge(pageNumber: number) {
    this.currentPage = pageNumber
    this.loadLocations()
  }
}
