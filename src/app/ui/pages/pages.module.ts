import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHomeComponent } from './app-home/app-home.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { OrganismsModule } from '../components/organisms/organisms.module';
import { AtomsModule } from '../components/atoms/atoms.module';
import { MoleculesModule } from '../components/molecules/molecules.module';
import { PagesRoutingModule } from './pages.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationsPageComponent } from './locations-page/locations-page.component';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { HousingPageComponent } from './housing-page/housing-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MapNameDepartmentPipe } from 'src/app/shared/pipes/department-map-name.pipe';


@NgModule({
  declarations: [
    AppHomeComponent,
    CreateCategoriesComponent,
    LocationsPageComponent,
    ConfigurationPageComponent,
    AppHomeComponent,
    HousingPageComponent,
    UserPageComponent,
    MapNameDepartmentPipe
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    OrganismsModule,
    AtomsModule,
    MoleculesModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
