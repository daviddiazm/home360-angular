import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismsModule } from '../organisms/organisms.module';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';



@NgModule({
  declarations: [
    ManagerLayoutComponent
  ],
  imports: [
    CommonModule,
    OrganismsModule
  ],
  exports: [
    ManagerLayoutComponent
  ]
})
export class TemplatesModule { }
