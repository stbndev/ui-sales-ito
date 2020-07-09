import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Sales2Model, SaleDetailsModel } from "./../../models/salesmodel";


@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  protected sales:Sales2Model;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    let queryparameters = this.router.snapshot.queryParamMap.get('data');
    let sales = JSON.parse(queryparameters);
    // console.dir(sales);

    try {
      let tmp = Object.assign(new Sales2Model(), sales);
      console.dir(tmp);
      this.sales = tmp;
    } catch (error) {

    }

  }

  mapObject(paramsX): any {
    let sales: Sales2Model = Object.assign(new Sales2Model(), paramsX);
    console.dir(sales.getNumber());
  }
}
