import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { NotificationComponent } from './notification/notification.component';
import { ArticleAncordComponent } from './article-ancord/article-ancord.component';
import { AutoSelectComponent } from './auto-select/auto-select.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NotificationComponent,
    ArticleAncordComponent,
    AutoSelectComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    ReactiveFormsModule
  ],
  exports: [
    NotificationComponent,
    ArticleAncordComponent,
    AutoSelectComponent
  ]
})
export class MoleculesModule { }
