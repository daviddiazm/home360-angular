import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriesComponent } from './create-categories.component';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Page } from 'src/app/core/models/page.interface';
import { Category } from 'src/app/core/models/category.interfaces';
import { of, throwError } from 'rxjs';
import { AtomsModule } from '../../components/atoms/atoms.module';
import { CommonModule } from '@angular/common';
import { ResponceUsualMessage } from 'src/app/shared/interfaces/responceUsualMessage.interface';

describe('CreateCategoriesComponent', () => {
  let component: CreateCategoriesComponent;
  let fixture: ComponentFixture<CreateCategoriesComponent>;
  let serviceMock: jest.Mocked<CategoriesService>;

  beforeEach(() => {
    const mockCategoriesPage: Page<Category> = {
      content: [{ id: 1, name: 'Category 1', description: 'Desc 1' }],
      totalPages: 1,
      page: 0,
      totalElements: 0,
      orderAsc: true,
      size: 10,
    };
    const mockResponse: ResponceUsualMessage = { message: 'mesnaje por default', localDate: '' };

    serviceMock = {
      postCategory: jest.fn().mockReturnValue(of(mockResponse)),
      getCategoriesByPage: jest.fn().mockReturnValue(of(mockCategoriesPage))
    } as unknown as jest.Mocked<CategoriesService>;

    TestBed.configureTestingModule({
      declarations: [CreateCategoriesComponent],
      imports: [ReactiveFormsModule, AtomsModule, CommonModule],
      providers: [
        FormBuilder,
        { provide: CategoriesService, useValue: serviceMock },
      ]
    });

    fixture = TestBed.createComponent(CreateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOninit', () => {
    it('should loadCategories when Oninit', () => {
      const spy = jest.spyOn(component, 'loadCategories')
      component.ngOnInit()
      expect(spy).toHaveBeenCalled()
    })
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

    serviceMock.getCategoriesByPage(0, 10, true);
    component.loadCategories();
    component.categoriesPage$.subscribe((page) => {

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


  it('should create categories and return a usualResponse', (done) => {
    serviceMock.postCategory('Test', 'Desc')

    component.categoryForm.setValue({ name: 'Test', description: 'Desc' })

    component.createCategory('Test', 'Desc')
    expect(serviceMock.postCategory).toHaveBeenCalledWith('Test', 'Desc');
    done()
  })

  it('should create categories and return a error', (done) => {
    const mockError = { status: 500, message: 'Server error' };
    serviceMock.postCategory.mockReturnValue( throwError(() => mockError) )
    console.error = jest.fn();

    component.categoryForm.setValue({ name: 'Test', description: 'Desc' })

    component.createCategory('Test', 'Desc')
    expect(serviceMock.postCategory).toHaveBeenCalledWith('Test', 'Desc');
    expect(console.error).toHaveBeenCalledWith('Error creating category:', mockError);
    done()
  })


  describe('onSave', () => {

    it('should marckAllAstouched if categoryForm is invalid', () => {
      const spyMarck = jest.spyOn(component.categoryForm, 'markAllAsTouched')
      component.onSave()
      expect(spyMarck).toHaveBeenCalled()
    })

    it('should call createCategory with name and description when the form is valid', () => {
      const createCategorySpy = jest.spyOn(component, 'createCategory');
      component.categoryForm.setValue({
        name: 'Test Category',
        description: 'Test Description',
      });
      component.onSave();
      expect(createCategorySpy).toHaveBeenCalledWith('Test Category', 'Test Description');
    });
  })

  describe('goToPage',() => {
    it('shoul be pageNumber equals to currentPage and call loadCategories',() => {
      const spyLoadCategories = jest.spyOn(component, 'loadCategories')
      const mockPageNumber = 0
      component.goToPage(mockPageNumber)
      expect(spyLoadCategories).toHaveBeenCalled()
      expect(component.currentPage).toEqual(mockPageNumber)
    })
  })

});
