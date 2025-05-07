import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';
import { HttpClientModule } from '@angular/common/http';
import { Page } from '../models/page.interface';
import { Category } from '../models/category.interfaces';
import { environment } from 'src/environments/environment.development';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch paginated categories', () => {
    const mockResponse: Page<Category> = {
      content: [
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' },
      ],
      page: 0,
      size: 2,
      orderAsc: true,
      totalElements: 2,
      totalPages: 1,
    };

    service.getCategoriesByPage(0, 2, true).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(res.content).toHaveLength(2);
      expect(res.content[0].name).toBe('Category 1');
    });

    const req = httpMock.expectOne(`${baseUrl}/categories/?page=0&size=2&orderAsc=true`)
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  });


  it('should get a category by name', () => {
    const mockResponse: Category = { id: 1, name: 'Category 1', description: 'Description 1' }
    service.getCategoryByName('Category 1').subscribe((category) => {
      expect(category).toEqual(mockResponse)
      expect(category.name).toEqual(mockResponse.name)
    })

    const req = httpMock.expectOne(`${baseUrl}/categories/category-by-name?name=Category%201`)
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })


  it('should create a new category via POST', () => {
    const mockCategory: Category = {
      id: 123,
      name: 'New Category',
      description: 'New Description'
    };

    const name = 'New Category';
    const description = 'New Description';

    service.postCategory(name, description).subscribe((res) => {
      expect(res).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${baseUrl}/categories/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name, description });
    req.flush(mockCategory)
  });


});
