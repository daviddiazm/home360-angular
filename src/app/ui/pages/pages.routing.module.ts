import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';

const routes: Routes = [
  {
    path: "categories",
    component: CreateCategoriesComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'categories'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
