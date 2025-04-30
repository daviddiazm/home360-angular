import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoriesComponent } from './pages/create-categories/create-categories.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';



@NgModule({
  declarations: [
    CreateCategoriesComponent,
    AppHomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UiModule { }
