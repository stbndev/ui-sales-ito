import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AddsetComponent } from './products/addset/addset.component';
import { MatCardModule } from '@angular/material/card';
import { FilterProductsPipe } from './config/filter-products.pipe';
import { SalesComponent } from './sales/sales.component';
import { MatTabsModule } from '@angular/material';
import { GriditemsComponent } from './sales/griditems/griditems.component';
import { MatTableModule } from '@angular/material/table';
import { PlaceorderComponent } from './sales/placeorder/placeorder.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TmpsaveorderComponent } from './sales/tmpsaveorder/tmpsaveorder.component';
import { NvtrsgridComponent } from './inventories/nvtrsgrid/nvtrsgrid.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { NvtrsitemComponent } from './inventories/nvtrsitem/nvtrsitem.component';
import { InventoryShrinkageComponent } from './inventory-shrinkage/inventory-shrinkage.component';
import { NvtrsrkgGridComponent } from './inventory-shrinkage/nvtrsrkg-grid/nvtrsrkg-grid.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    MainNavComponent,
    ProductsComponent,
    AddsetComponent,
    FilterProductsPipe,
    SalesComponent,
    GriditemsComponent,
    PlaceorderComponent,
    TmpsaveorderComponent,
    NvtrsgridComponent,
    InventoriesComponent,
    NvtrsitemComponent,
    InventoryShrinkageComponent,
    NvtrsrkgGridComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    MatSliderModule,
    MatGridListModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    //
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
