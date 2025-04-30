import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrganismsModule } from './ui/components/organisms/organisms.module';
import { SideBarComponent } from './ui/components/organisms/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrganismsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
