import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.interfaces';
import { Page } from 'src/app/core/models/page.interface';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent {

  categories$!: Observable<Page<Category>>;

  currentPage = 0;
  pageSize = 10;
  orderAsc = true;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {}

  categoryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(90)]]
  })

  ngOnInit(): void {
    this.loadCategories();
  }

  getFiledError(controlName: string): string | null {
    if( !this.categoryForm.controls[controlName] ) return null
    if( !this.categoryForm.controls[controlName].touched ) return null
    const errors = this.categoryForm.controls[controlName].errors ?? {}
    for( const key of Object.keys(errors) ) {
      switch(key) {
        case "required" :
          return "el campo es requerido"
        case "minlength":
          return `ingresar un minimo de ${ errors["minlength"].requiredLength } caracteres`
      }
    }
    return null
  }

  loadCategories(): void {
    this.categories$ = this.categoriesService.getCategoriesByPage(
      this.currentPage,
      this.pageSize,
      this.orderAsc
    );
  }
}
