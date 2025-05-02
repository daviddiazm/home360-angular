import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoriesComponent } from './ui/pages/create-categories/create-categories.component';

const routes: Routes = [
  {
    path: "categories",
    loadChildren: () => import("./ui/pages/pages.module").then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
