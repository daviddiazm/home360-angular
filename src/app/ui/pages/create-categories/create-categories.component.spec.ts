import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriesComponent } from './create-categories.component';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Page } from 'src/app/core/models/page.interface';
import { Category } from 'src/app/core/models/category.interfaces';
import { of } from 'rxjs';

describe('CreateCategoriesComponent', () => {
  let component: CreateCategoriesComponent;
  let fixture: ComponentFixture<CreateCategoriesComponent>;
  let serviceMock: jest.Mocked<CategoriesService>;

  beforeEach(() => {
    serviceMock = {
      postCategory: jest.fn(),
      getCategoriesByPage: jest.fn()
    } as unknown as jest.Mocked<CategoriesService>;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CategoriesService, useValue: serviceMock }
      ]
    });

    const fb = TestBed.inject(FormBuilder);
    component = new CreateCategoriesComponent(serviceMock, fb);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories and return a Page<Category>', (done) => {
    const mockPage: Page<Category> = {
      content: [
        { id: 1, name: 'Category 1', description: 'Desc 1' }
      ],
      page: 0,
      size: 10,
      totalElements: 1,
      totalPages: 1,
      orderAsc: true
    };

    serviceMock.getCategoriesByPage.mockReturnValue(of(mockPage));
    component.loadCategories();
    component.categories$.subscribe((page) => {

      expect(page).toHaveProperty('content');
      expect(page).toHaveProperty('page');
      expect(page).toHaveProperty('size');
      expect(page).toHaveProperty('totalElements');
      expect(page).toHaveProperty('totalPages');
      expect(page).toHaveProperty('orderAsc');

      expect(page.content[0]).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String)
      }));

      done();
    });
  });


  it('should create categories and return a Page<Category>', (done) => {
    serviceMock.postCategory.mockReturnValue(of({
      id: 1,
      name: 'Test',
      description: 'Desc',
    }));

    component.categoryForm.setValue({name: 'Test', description: 'Desc'})

    component.createCategory('Test', 'Desc')
    expect(serviceMock.postCategory).toHaveBeenCalledWith('Test', 'Desc');
    done()
  })

});
