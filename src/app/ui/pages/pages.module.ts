import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHomeComponent } from './app-home/app-home.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';



@NgModule({
  declarations: [
    AppHomeComponent,
    CreateCategoriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
