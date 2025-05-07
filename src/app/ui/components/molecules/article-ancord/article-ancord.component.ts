import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-ancord',
  templateUrl: './article-ancord.component.html',
  styleUrls: ['./article-ancord.component.scss']
})
export class ArticleAncordComponent {

  @Input() title: string = ''
  @Input() itemList: string[] = []
  @Input() isRow?: boolean = false


}
