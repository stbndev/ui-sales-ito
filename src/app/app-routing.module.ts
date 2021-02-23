import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from "./products/products.component";
import { SalesComponent } from "./sales/sales.component";
import { InventoriesComponent } from "./inventories/inventories.component";
import { InventoryShrinkageComponent } from './inventory-shrinkage/inventory-shrinkage.component';
import { SignupComponent } from "./users/signup/signup.component";
import { OrderdetailsComponent } from "./sales/orderdetails/orderdetails.component";
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProductsComponent,
    // data: { title: 'Productos' },
  },
  {
    path: 'login',
    component: SignupComponent,
    pathMatch: 'full',
  //  data:{ title:'Ingresar'}
  },
  {
    canActivate: [AuthGuard],
    path: 'orderdetails',
    component: OrderdetailsComponent,
//    data: { title: 'Ordenes' }
  },
    {
    canActivate: [AuthGuard],
    path: 'products',
    component: ProductsComponent,
    // data: { title: 'Productos' }
  },
  {
    canActivate: [AuthGuard],
    path: 'sales',
    component: SalesComponent,
    data: { title: 'Ventas' }
  },
  {
    canActivate: [AuthGuard],
    path: 'entries',
    component: InventoriesComponent,
    data: { title: 'Inventories Module' }
  },
  {
    canActivate: [AuthGuard],
    path: 'shrinkages',
    component: InventoryShrinkageComponent,
    data: { title: 'Inventory Shinkage Module' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
