import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { HouseService } from '../../../core/services/house.service';
import { map } from 'rxjs';
import { GetHousesFilter, House } from 'src/app/core/models/house.interface';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.scss']
})
export class ViewHouseComponent implements OnInit, OnDestroy {

  houseFiltterValue: GetHousesFilter = {
    page: 0,
    size: 0,
    orderAsc: true,
    idLocation: 0,
    idCategory: 0,
    roomsQuantity: 0,
    bathroomsQuantity: 0,
    minPrice: 0,
    maxPrice: 999999999
  }
  houses: House[] = []

  constructor(
    private readonly locationService: LocationService,
    private readonly houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.locationService.getPaginatedLocation(0, 50, true, "cauca").pipe(
      map(pageLocation => pageLocation.content.map(location => location.id))
    ).subscribe(locationsIds => {
      console.log(locationsIds);
      locationsIds.forEach(id => {

      });
      // this.houseService.getHousesPaginated()
    });
  }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }



}
