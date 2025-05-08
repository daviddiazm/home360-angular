import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MoleculesModule } from "../molecules/molecules.module";
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideBarComponent,
    TopBarComponent,
    FooterComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MoleculesModule,
    RouterModule
],
  exports: [
    SideBarComponent,
    TopBarComponent,
    FooterComponent,
    TableComponent
  ]
})
export class OrganismsModule { }
