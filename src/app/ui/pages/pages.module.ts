import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHomeComponent } from './app-home/app-home.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { OrganismsModule } from '../components/organisms/organisms.module';
import { AtomsModule } from '../components/atoms/atoms.module';
import { MoleculesModule } from '../components/molecules/molecules.module';
import { PagesRoutingModule } from './pages.routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppHomeComponent,
    CreateCategoriesComponent
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
