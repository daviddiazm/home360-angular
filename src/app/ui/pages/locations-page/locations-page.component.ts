import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { filter, map, Observable, tap } from 'rxjs';
import { Department } from 'src/app/core/models/department.interface';
import { City } from 'src/app/core/models/city.interface';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit {
  constructor(private locationService: LocationService) {}
  departments: Department[] = []
  departments$?: Observable<Department[]>
  cities: City[] = []
  cities$?: Observable<City[]>
  citiesName$?: Observable<string[]>


  ngOnInit(): void {
    this.getDepartments()
  }

  getDepartments() {
    this.departments$ = this.locationService.getDepartments()
    this.departments$.subscribe(departments => {
      this.departments = departments
    })
  }

  getCities(idDepartment: number) {
    this.cities$ = this.locationService.getCitiesByDepartment(idDepartment)
    this.citiesName$ = this.cities$.pipe(
      map((cities) => cities.map((city) => city.name))
      ,tap((e) => {
        console.log(e);

      })
    )
  }

  onDepartmentSelected(departmentName: any) {
    console.log("este es el departamento seleccionado ", departmentName );
    const selected = this.departments.find(d => d.name === departmentName);
    this.getCities(selected!.id)
  }


}
