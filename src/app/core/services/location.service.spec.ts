import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.development';
import { Department } from '../models/department.interface';
import { ResponceUsualMessage } from 'src/app/shared/interfaces/responceUsualMessage.interface';
import { City } from '../models/city.interface';

const mockDepartments: Department[] = [
  { id: 1, name: 'Department 1', description: "esta es una descripcion" },
  { id: 2, name: 'Department 2', description: "esta es una descripcion" }
];

const mockCities: City[] = [
  { id: 1, name: 'City 1', departmentId: 1, description: "esta es una descripcion" },
  { id: 2, name: 'City 2', departmentId: 1, description: "esta es una descripcion" }
];

const mockResponse: ResponceUsualMessage = {
  message: 'Location created successfully',
  localDate: ''
};

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl;
  const regionBaseUrl = environment.regionUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController)
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDepartments', () => {
    it('should fetch all departments', () => {
      service.getDepartments().subscribe(departments => {
        expect(departments.length).toBe(2);
        expect(departments).toEqual(mockDepartments);
      });
      const req = httpMock.expectOne(`${regionBaseUrl}/Department/`);
      expect(req.request.method).toBe('GET');
      req.flush(mockDepartments);
    });
  });

  describe('getCitiesByDepartment', () => {
    it('should fetch cities for a specific department', () => {
      const departmentId = 1;

      service.getCitiesByDepartment(departmentId).subscribe(cities => {
        expect(cities.length).toBe(2);
      });

      const req = httpMock.expectOne(
        `${regionBaseUrl}/Department/${departmentId}/cities`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCities);
    });
  });

  describe('getNameMunicipalities', () => {
    it('should return only city names for a department', () => {
      const departmentId = 1;
      const expectedNames = mockCities.map(c => c.name);

      service.getNameMunicipalities(departmentId).subscribe(names => {
        expect(names).toEqual(expectedNames);
      });

      const req = httpMock.expectOne(
        `${regionBaseUrl}/Department/${departmentId}/cities`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCities);
    });
  });

  describe('getAllCities', () => {
    it('should fetch all cities', () => {
      service.getAllCities().subscribe(cities => {
        expect(cities.length).toBe(2);
        expect(cities).toEqual(mockCities);
      });

      const req = httpMock.expectOne(`${regionBaseUrl}/City`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCities);
    });
  });

  describe('postLocation', () => {
    it('should post location data', () => {
      const sector = 'Test Sector';
      const municipalityId = 1;

      service.postLocation(sector, municipalityId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/locations/`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ sector, municipalityId });
      req.flush(mockResponse);
    });
  });
});
