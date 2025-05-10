import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/core/models/department.interface';
import { City } from 'src/app/core/models/city.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/form-util';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit {
  FormUtils = FormUtils

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder
  ) { }

  locationForm = this.formBuilder.group({
    department: ['', [Validators.required]],
    city: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  })

  private cityId?: number

  departments: Department[] = []
  departments$?: Observable<Department[]>

  cities: City[] = []
  citiesName: string[] = []
  cities$?: Observable<City[]>


  ngOnInit(): void {
    this.getDepartments()

    this.locationForm.valueChanges.subscribe(value => {
      if (value.department) this.onDepartmentSelected(value.department)
      if (value.city) this.onCitySelected(value.city)
    })
  }


  getDepartments() {
    this.departments$ = this.locationService.getDepartments()
    this.departments$.subscribe(departments => {
      this.departments = departments
    })
  }

  getCities(idDepartment: number) {
    this.cities$ = this.locationService.getCitiesByDepartment(idDepartment)
    this.cities$.subscribe((cities) => {
      this.cities = cities
      this.citiesName = cities.map(city => city.name)
    })
  }

  onDepartmentSelected(departmentName: string) {
    const departmentSelected = this.departments.find(department => department.name == departmentName);
    if (departmentSelected) this.getCities(departmentSelected?.id)
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
    if (this.locationForm.valid) {
      this.createNewLocation()
    }
  }

}
