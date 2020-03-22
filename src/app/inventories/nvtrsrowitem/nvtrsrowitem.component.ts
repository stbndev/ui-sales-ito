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
  constructor(data2 : any ) { 
    console.dir(data2);
  }

  ngOnInit() {
    // console.dir(this.data);
    // this.entryproduct = Productstestmodel;
    // this.entryproduct.name = 'test';
    // this.entryproduct.name = this.data.name;
  }

}
