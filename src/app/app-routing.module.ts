import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from "./products/products.component";
import { SalesComponent } from "./sales/sales.component";

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products Module' }
  },
  {
    path: 'sales',
    component: SalesComponent,
    data: { title : 'Sales Module' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
