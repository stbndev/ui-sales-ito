import { Component, OnInit, Input } from '@angular/core';
import { Productsmodel, Productstestmodel } from 'src/app/models/productsmodel';
import { CSTATUS } from "./../../config/enums-global.enum";

@Component({
  selector: 'app-nvtrsrowitem',
  templateUrl: './nvtrsrowitem.component.html',
  styleUrls: ['./nvtrsrowitem.component.css']
})
export class NvtrsrowitemComponent implements OnInit {
  @Input() data: any;
  // entryproduct: Productstestmodel;
  // constructor(data2 : any ) { 
  // }
  estatusname: String;
  constructor() {

  }

  ngOnInit() {
    //console.dir(this.data)
    let tmpidcstatus = this.data.idcstatus;
    let t = CSTATUS.filter(function (x) {
      // console.dir(x);
      if (parseInt(x.value) === tmpidcstatus) {
        return x;
      }
    });
    this.estatusname = t[0].viewValue;
  }

}
