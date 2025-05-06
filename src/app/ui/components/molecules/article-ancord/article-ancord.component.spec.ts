import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAncordComponent } from './article-ancord.component';

describe('ArticleAncordComponent', () => {
  let component: ArticleAncordComponent;
  let fixture: ComponentFixture<ArticleAncordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleAncordComponent]
    });
    fixture = TestBed.createComponent(ArticleAncordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
