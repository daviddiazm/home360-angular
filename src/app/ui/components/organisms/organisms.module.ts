import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [
    SideBarComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    SideBarComponent,
    TopBarComponent
  ]
})
export class OrganismsModule { }
