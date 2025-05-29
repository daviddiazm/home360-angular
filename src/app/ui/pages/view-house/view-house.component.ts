import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { HouseService } from '../../../core/services/house.service';
import { map } from 'rxjs';
import { GetHousesFilter, House } from 'src/app/core/models/house.interface';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/core/models/category.interfaces';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.scss']
})
export class ViewHouseComponent implements OnInit, OnDestroy {

  houseFiltterInitValue: GetHousesFilter = {
    page: 0,
    size: 10,
    orderAsc: true,
    cityName: "",
    idCategory: 0,
    roomsQuantity: 0,
    bathroomsQuantity: 0,
    minPrice: 0,
    maxPrice: 0
  }

  currentPage: number = 0
  pageSize: number = 10
  orderAsc: boolean = true
  pageNumbers: number[] = []
  totalPages = 0
  searchTerm: string = ''
  showDialog: boolean = false
  housesList: House[] = []
  categoriesName: string[] = []
  categories: Category[] = []
  categoryId: number = 0

  filterHouseForm: FormGroup = this.formBuilder.group({
    page: [this.houseFiltterInitValue.page],
    size: [this.houseFiltterInitValue.size],
    orderAsc: [this.houseFiltterInitValue.orderAsc],
    cityName: [this.houseFiltterInitValue.cityName],
    categoryName: [''],
    idCategory: [this.houseFiltterInitValue.idCategory],
    roomsQuantity: [this.houseFiltterInitValue.roomsQuantity],
    bathroomsQuantity: [this.houseFiltterInitValue.bathroomsQuantity],
    minPrice: [this.houseFiltterInitValue.minPrice],
    maxPrice: [this.houseFiltterInitValue.maxPrice]
  })

  constructor(
    private readonly houseService: HouseService,
    private readonly categoriesService: CategoriesService,
    private readonly formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.loadHouses()
    this.loadCategories()
    this.formWatcher()
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  loadCategories() {
    this.categoriesService.getCategoriesByPage(0, 50, true).subscribe(categoryPage => {
      this.categoriesName = categoryPage.content.map(category => category.name)
      this.categories = categoryPage.content
    })
  }

  loadHouses() {
    this.houseService.getHousesPaginated(this.filterHouseForm.value).subscribe(hosuePage => {
      this.housesList = hosuePage.content
      this.pageNumbers = [];
      this.totalPages = hosuePage.totalPages
      for (let i = 0; i < hosuePage.totalPages; i++) {
        this.pageNumbers.push(i);
      }
    })
  }

  formWatcher() {
    this.filterHouseForm.valueChanges.subscribe(value => {
      this.loadHouses()
    })

    this.filterHouseForm.get('categoryName')?.valueChanges.subscribe(categoryName => {
      this.onCategorySelected(categoryName)
    })
  }

  onCategorySelected(categoryName: string) {
    const categorySelected = this.categories.find(category => category.name == categoryName);
    if (categorySelected?.id) {
      this.filterHouseForm.get('idCategory')?.setValue(categorySelected.id)
    } else {
      this.filterHouseForm.get('idCategory')?.setValue(0)
    }
  }

  openFilterModal() {
    this.showDialog = true;
  }

  resetAndCloseForm() {
    this.filterHouseForm.patchValue(this.houseFiltterInitValue)
    this.closeFilterModal()
  }

  closeFilterModal() {
    this.showDialog = false;
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.filterHouseForm.get('cityName')?.setValue(this.searchTerm)
    this.currentPage = 0;
    this.loadHouses();
  }

  onSort(ascending: boolean) {
    this.orderAsc = ascending;
    this.filterHouseForm.get('orderAsc')?.setValue(this.orderAsc)
    this.loadHouses();
  }

  onPageCahnge(pageNumber: number) {
    this.currentPage = pageNumber
    this.filterHouseForm.get('page')?.setValue(this.currentPage)
    this.loadHouses()
  }



}
