import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, debounceTime, map, Observable, of, switchMap, take, } from "rxjs";
import { CategoriesService } from "src/app/core/services/categories.service";

export function uniqueCategoryNameValidator(categoriesService: CategoriesService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        return categoriesService.getCategoryByName(value).pipe(
          map(category => {
            return category ? { nameExists: true } : null;
          }),
          catchError(() => of(null))
        );
      }),
      take(1)
    )
  };
}
