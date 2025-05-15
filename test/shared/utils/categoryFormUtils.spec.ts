import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of, throwError } from "rxjs";
import { Category } from "src/app/core/models/category.interfaces";
import { CategoriesService } from "src/app/core/services/categories.service";
import { uniqueCategoryNameValidator } from "src/app/shared/utils/categoryFormUtils";
import { fakeAsync, tick } from '@angular/core/testing'; // Importa fakeAsync y tick

describe('uniqueCategoryNameValidator', () => {
  let categoriesService: jest.Mocked<CategoriesService>;
  let control: AbstractControl;
  let validatorFn: AsyncValidatorFn;

  beforeEach(() => {
    categoriesService = {
      getCategoryByName: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<CategoriesService>;

    control = {
      valueChanges: of('test'),
      value: 'test',
      markAsTouched: jest.fn(),
      markAsDirty: jest.fn(),
      setErrors: jest.fn(),
    } as unknown as AbstractControl;

    validatorFn = uniqueCategoryNameValidator(categoriesService);
  });

  // it('should return null if category name does not exist', fakeAsync(() => {
  //   // Configuración específica para este test
  //   (categoriesService.getCategoryByName as jest.Mock).mockReturnValueOnce(of([]));

  //   let validationResult: ValidationErrors | null = null;

  //   (validatorFn(control) as Observable<ValidationErrors | null>).subscribe(result => {
  //     validationResult = result;
  //   });

  //   tick(500);

  //   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  //   console.log(validationResult);

  //   expect(validationResult).toBeNull();
  //   expect(categoriesService.getCategoryByName).toHaveBeenCalledWith('test');
  // }));

  it('should return error if category name exists', fakeAsync(() => {
    const mockCategory: Category = { id: 1, name: 'test', description: 'desc' };
    (categoriesService.getCategoryByName as jest.Mock).mockReturnValueOnce(of([mockCategory]));

    let validationResult: ValidationErrors | null = null;

    (validatorFn(control) as Observable<ValidationErrors | null>).subscribe(result => {
      validationResult = result;
    });

    tick(500);

    expect(validationResult).toEqual({ nameExists: true });
  }));

  it('should return null if service error', fakeAsync(() => {
    const mockError = { status: 500, message: 'Server error' };
    (categoriesService.getCategoryByName as jest.Mock).mockReturnValueOnce(throwError(() => mockError));

    let validationResult: ValidationErrors | null = null;

    (validatorFn(control) as Observable<ValidationErrors | null>).subscribe(result => {
      validationResult = result;
    });

    tick(500);

    expect(validationResult).toEqual(null);
  }));


});
