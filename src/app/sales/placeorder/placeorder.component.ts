import { Component, OnInit } from '@angular/core';
import { Productsmodel } from "./../../models/productsmodel";
import { eTipos, eCSTATUS } from './../../config/enums-global.enum';
import { Salesmodel, SaleDetails } from "./../../models/salesmodel";
import { ConfigService } from 'src/app/config/config-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TmpsaveorderComponent } from "./../tmpsaveorder/tmpsaveorder.component";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})

export class PlaceorderComponent implements OnInit {
  products: any = [];
  totalOrder: number = 0;
  totalItemsOrder: number = 0;
  durationInSeconds = 50;
  mySubscription: any;

  constructor(private router: Router,
    protected service: ConfigService,
    private _snackBar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  removeProduct(arg) {
    // console.dir(this.products);

    let filtered = this.products.filter(function (value, index, arr) {
      return value.id != arg.id
    });


    this.products = this.products.splice(0, this.products.length);
    this.products = filtered;

  }
  remove() {
    // A.splice(0,A.length)
    this.products = this.products.splice(0, this.products.length);
    // this.products =[];
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.service.listproductsData.subscribe(
      res => {

        this.products = res;
        let tmpquantity = 0;
        let tmptotal = [];
        let tmptotal2 = 0;

        this.products.forEach(element => {
          tmpquantity += element.quantity;
          let tmp = element.quantity * element.unitary_price;
          tmptotal2 += element.quantity * element.unitary_price;
          tmptotal.push(tmp);
        });
        this.totalItemsOrder = tmpquantity;
        this.totalOrder = tmptotal2;
      },
      error => {
        alert(error);
      }
    );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(TmpsaveorderComponent, {
      duration: this.durationInSeconds * 1000,
    });

  }

  onPlaceOrder(e) {
    //TODO:
    // VALIDATE IN CORE WHEN I DONT HAVE PRODUCT EXISTS
    // OK.VALIDATE IN FRONTEND WHEN I DONT HAVE PRODUCTS
    // RESET PLACE ORDER AND CREATE PRINT PAPER 

    let data = this.buildData();
    this.service.Make('sales', eTipos.POST, data).subscribe(
      d => {
        alert('Orden pedida No.' + d.data.idsales);
        let purchase = JSON.stringify(data);
        window.open(`/orderdetails?data=${purchase}`, '_blank');
        window.location.reload();
      }, error => {
        alert('placeorder.onPlaceOrder');
      }
    ).add(() => {
      console.log('end');
    });
  }

  onSaveOrder(e) {


  }

  private buildData() {
    // SaleDetails 
    let array = [];

    this.products.forEach(element => {
      let sd = new SaleDetails(element.unitary_cost, element.unitary_price, element.quantity, element.idproducts);
      array.push(sd);
    });
    let sm = new Salesmodel(this.totalOrder, 0, eCSTATUS.ACTIVO, 0, 'angularwebapp', 0, 0, array);
    return sm;
  }

}
