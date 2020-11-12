import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from "./products/products.component";
import { SalesComponent } from "./sales/sales.component";
import { InventoriesComponent } from "./inventories/inventories.component";
import { InventoryShrinkageComponent } from './inventory-shrinkage/inventory-shrinkage.component';
import { SignupComponent } from "./users/signup/signup.component";
import { OrderdetailsComponent } from "./sales/orderdetails/orderdetails.component";
import { CanActivateViaGuard } from './config/can-activate-via.guard';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    pathMatch: 'full',
    data: { title: 'Ingresar' }
  },
  {
    path: 'orderdetails',
    component: OrderdetailsComponent,
    pathMatch: 'full',
    data: { title: 'Order Details' }
  },
  {
    path: 'users',
    component: SignupComponent,
    pathMatch: 'full',
    data: { title: 'Users Module' }
  },
  {
   canActivate:[CanActivateViaGuard],
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products Module' }
  },
  {
    canActivate:[CanActivateViaGuard],
    path: 'sales',
    component: SalesComponent,
    data: { title : 'Sales Module' }
  },
  {
    canActivate:[CanActivateViaGuard],
    path: 'entries',
    component: InventoriesComponent,
    data: { title : 'Inventories Module' }
  },
  {
    canActivate:[CanActivateViaGuard],
    path: 'shrinkages',
    component: InventoryShrinkageComponent,
    data: { title : 'Inventory Shinkage Module' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
