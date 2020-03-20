import { Component, OnInit, Input } from '@angular/core';
import { Productsmodel, Productstestmodel } from 'src/app/models/productsmodel';

@Component({
  selector: 'app-nvtrsrowitem',
  templateUrl: './nvtrsrowitem.component.html',
  styleUrls: ['./nvtrsrowitem.component.css']
})
export class NvtrsrowitemComponent implements OnInit {
  @Input() data :any;
  entryproduct: Productstestmodel;
  constructor() { 
    // console.dir(this.data);
  }

  ngOnInit() {
    console.dir(this.data);
    this.entryproduct.name = 'test';
    // this.entryproduct.name = this.data.name;
  }

}
