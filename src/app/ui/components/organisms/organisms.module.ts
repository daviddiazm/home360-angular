import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MoleculesModule } from "../molecules/molecules.module";



@NgModule({
  declarations: [
    SideBarComponent,
    TopBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MoleculesModule
],
  exports: [
    SideBarComponent,
    TopBarComponent,
    FooterComponent
  ]
})
export class OrganismsModule { }
