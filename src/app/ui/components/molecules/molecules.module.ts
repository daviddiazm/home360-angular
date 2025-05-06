import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { ArticleAncordComponent } from './article-ancord/article-ancord.component';



@NgModule({
  declarations: [
    NotificationComponent,
    ArticleAncordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationComponent,
    ArticleAncordComponent
  ]
})
export class MoleculesModule { }
