import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/shared/utils/form-util';
import { LocationService } from '../../../core/services/location.service';
import { Department } from 'src/app/core/models/department.interface';
import { Observable, Subscription, map } from 'rxjs';
import { City } from 'src/app/core/models/city.interface';
import { Location } from 'src/app/core/models/location.interfaces';
import { HouseService } from 'src/app/core/services/house.service';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from 'src/app/core/models/category.interfaces';

@Component({
  selector: 'app-housing-page',
  templateUrl: './housing-page.component.html',
  styleUrls: ['./housing-page.component.scss']
})
export class HousingPageComponent implements OnInit, OnDestroy {

  FormUtils = FormUtils
  saveIsSucces: boolean = false

  departments: Department[] = []
  departmentsName: string[] = []
  departmentId$?: number
  departments$?: Observable<Department[]>

  cities: City[] = []
  citiesName: string[] = []
  cities$?: Observable<City[]>
  cityId?: number

  locations: Location[] = []
  locationsName: string[] = []
  locations$?: Observable<Location[]>
  locationId?: number

  categories: Category[] = []
  categoriesName: string[] = []
  categories$?: Observable<Category[]>
  categoryId?: number

  subscription: Subscription = new Subscription()

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly locationService: LocationService,
    private readonly categoriesService: CategoriesService,
    private readonly houseService: HouseService,
  ) { }

  ngOnInit(): void {
    this.formChanges()
    this.getCategories()
    this.getDepartments()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  houseForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    roomsQuantity: ['', [Validators.required, Validators.min(1)]],
    bathroomsQuantity: ['', [Validators.required, Validators.min(1)]],
    address: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    publishDate: ['', Validators.required],
    departementName: ['', Validators.required],
    cityName: ['', Validators.required],
    locationName: ['', Validators.required],
    categoryName: ['', Validators.required],
    categoryModel_id: ['', Validators.required],
    locationModel_id: ['', Validators.required]
  });

  formChanges() {

    const categoryWatcher = this.houseForm.get('categoryName')?.valueChanges.subscribe(categoryName => {
      this.onCategorySelected(categoryName)
    })
    this.subscription.add(categoryWatcher)

    const departmentWatcher = this.houseForm.get('departementName')?.valueChanges.subscribe(departmentName => {
      this.onDepartmentSelected(departmentName)
    })
    this.subscription.add(departmentWatcher)

    const cityWatcher = this.houseForm.get('cityName')?.valueChanges.subscribe(cityName => {
      this.onCitySelected(cityName)
    })
    this.subscription.add(cityWatcher)

    const locationWatcher = this.houseForm.get('locationName')?.valueChanges.subscribe(locationName => {
      this.onLocationSelected(locationName)
    })
    this.subscription.add(locationWatcher)
  }

  getCategories() {
    this.categories$ = this.categoriesService.getCategoriesByPage(0, 999, true).pipe(
      map(categoryPgae => categoryPgae.content)
    )
    const getCategoriesSubscription = this.categories$.subscribe(categories => {
      this.categories = categories
      this.categoriesName = this.categories.map(c => c.name)
    })
    this.subscription.add(getCategoriesSubscription)
  }

  onCategorySelected(categoryName: string) {
    const categorySelected = this.categories.find(category => category.name == categoryName)
    if (categorySelected) {

      this.categoryId = categorySelected.id
      this.houseForm.get("categoryModel_id")?.setValue(this.categoryId)
    }
  }

  getDepartments() {
    this.departments$ = this.locationService.getDepartments()
    const getDepartmentsSubscription = this.departments$.subscribe(departments => {
      this.departments = departments
      this.departmentsName = this.departments.map(d => d.name)
    })
    this.subscription.add(getDepartmentsSubscription)
  }

  onDepartmentSelected(departmentName: string) {
    const departmentSelected = this.departments.find(department => department.name == departmentName);
    if (departmentSelected) this.getCities(departmentSelected?.id)
    if (this.houseForm.get('cityName')?.value) {
      this.houseForm.get('cityName')?.setValue('')
    }
  }

  getCities(departmentId: number) {
    this.cities$ = this.locationService.getCitiesByDepartment(departmentId)
    const getCitiesByDepartmentIdsSubscription = this.cities$.subscribe((cities) => {
      this.cities = cities
      this.citiesName = cities.map(city => city.name)
    })
    this.subscription.add(getCitiesByDepartmentIdsSubscription)
  }

  onCitySelected(cityName: string) {
    const citySelected = this.cities.find(city => city.name == cityName)
    if (citySelected) this.getLocations(citySelected?.id)
  }

  getLocations(cityId: number) {
    this.locations$ = this.locationService.getLocationsByCityId(cityId)
    const locationSubscription = this.locations$.subscribe((locations) => {
      this.locations = locations
      this.locationsName = locations.map(location => location.sector)
    })
    this.subscription.add(locationSubscription)
  }

  onLocationSelected(locationName: string) {
    const locationSelected = this.locations.find(location => location.sector == locationName)
    if (locationSelected) {
      this.locationId = locationSelected.id
      this.houseForm.get("locationModel_id")?.setValue(this.locationId)
    }
  }

  onSave(): void {
    if (this.houseForm.invalid) {
      this.houseForm.markAllAsTouched();
      return;
    }
    try {
      this.houseService.postHouse(this.houseForm.value).subscribe(() => {
        this.saveIsSucces = true;
        this.houseForm.reset();
      });
    } catch (error) {
      console.error('Error saving house:', error);
    }
  }
}
