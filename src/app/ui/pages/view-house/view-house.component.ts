import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { HouseService } from '../../../core/services/house.service';
import { map } from 'rxjs';
import { GetHousesFilter, House } from 'src/app/core/models/house.interface';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.scss']
})
export class ViewHouseComponent implements OnInit, OnDestroy {

  housesList: House[] = []

  categoriesName: string[] = []

  houseFiltterValue: GetHousesFilter = {
    page: 0,
    size: 50,
    orderAsc: true,
    cityName: "",
    idCategory: 0,
    roomsQuantity: 0,
    bathroomsQuantity: 0,
    minPrice: 0,
    maxPrice: 99999
  }
  currentPage: number = 0
  pageSize: number = 10
  orderAsc: boolean = true
  totalPages = 0
  searchTerm: string = ''
  houses: House[] = []

  constructor(
    private readonly houseService: HouseService,
    private readonly categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.loadHouses()
    this.loadCategories()
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  loadCategories() {
    this.categoriesService.getCategoriesByPage(0,50,true).subscribe(categoryPage => {
      this.categoriesName = categoryPage.content.map(category => category.name)
    })
  }

  loadHouses() {
    this.houseService.getHousesPaginated(this.houseFiltterValue).subscribe(hosuePage => {
      console.log(hosuePage);
      this.housesList = hosuePage.content
    })
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 0;
    this.loadHouses();
  }

  onSort(ascending: boolean) {
    this.orderAsc = ascending;
    this.loadHouses();
  }

  onPageCahnge(pageNumber: number) {
    this.currentPage = pageNumber
    this.loadHouses()
  }



}
