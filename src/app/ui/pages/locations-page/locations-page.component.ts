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

  cityId?: number

  departments: Department[] = []
  departmentsName: string[] = []
  departments$?: Observable<Department[]>

  cities: City[] = []
  citiesName: string[] = []
  cities$?: Observable<City[]>

  saveIsSucces: boolean = false


  ngOnInit(): void {
    this.getDepartments()

    this.locationForm.get('city')?.valueChanges.subscribe( value => {
      if(value) this.onCitySelected(value)
    })
    this.locationForm.get('department')?.valueChanges.subscribe( value => {
      if(value) this.onDepartmentSelected(value)
    })
  }


  getDepartments() {
    this.departments$ = this.locationService.getDepartments()
    this.departments$.subscribe(departments => {
      this.departments = departments
    })

    if(this.departments.length > 0) {
      this.departmentsName = this.departments.map(d => d.name )
    }
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
    if(this.locationForm.get('city')?.value) {
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
    if (this.locationForm.valid) {
      this.createNewLocation()
    }
  }

}
