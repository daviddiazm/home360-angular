import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { HousingPageComponent } from './housing-page/housing-page.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardPageComponent
  },
  {
    path: "categories",
    component: CreateCategoriesComponent
  },
  {
    path: "housing",
    component: HousingPageComponent
  },
  {
    path: "users",
    component: UserPageComponent
  },
  {
    path: "locations",
    component: LocationsPageComponent
  },
  {
    path: "settings",
    component: ConfigurationPageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
