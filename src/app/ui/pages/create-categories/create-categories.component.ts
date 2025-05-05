import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, MinValidator, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.interfaces';
import { Page } from 'src/app/core/models/page.interface';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FormUtils } from '../../../shared/utils/form-util';
import { uniqueCategoryNameValidator } from 'src/app/shared/utils/categoryFormUtils';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent {

  FormUtils = FormUtils

  categories$!: Observable<Page<Category>>;
  category$?:Observable<Category>

  isCategorySave = true
  currentPage = 0;
  pageSize = 10;
  orderAsc = true;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {}

  categoryForm: FormGroup = this.fb.group({
    name:
      ['',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        [uniqueCategoryNameValidator(this.categoriesService)]
      ],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(90)]]
  })

  ngOnInit(): void {
    this.loadCategories();
    this.category$ = this.categoriesService.getCategoryByName("barrio")
  }

  onSave() {
    if(this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
    } else {
      this.createCategory(this.categoryForm.get("name")?.value, this.categoryForm.get("description")?.value)
    }
  }

  private createCategory(name:  string , description: string) {
    this.categoriesService.postCategory(name, description).subscribe({
      next: () => {
        this.categoryForm.reset();
        this.loadCategories();
        this.isCategorySave = true
      },
      error: (err) => {
        console.error('Error creating category:', err);
      }
    });
  }

  private loadCategories(): void {
    this.categories$ = this.categoriesService.getCategoriesByPage(
      this.currentPage,
      this.pageSize,
      this.orderAsc
    );
  }


}
