import { AfterViewInit, ElementRef, Component, OnInit } from '@angular/core';
import { Productsmodel } from "./../../models/productsmodel";
import { Tipos } from "./../../config/enums-global.enum";
import { CSTATUS } from "./../../config/enums-global.enum";
// import { ConfigService } from "./../../config/config.service";
import { ConfigService } from "./../../config/config-service.service";

export class Productsmodel2 {
  // idproducts: number;
  // name: String;
  constructor(public idproducts: number, public name: String) { }
}

@Component({
  selector: 'products-addset',
  templateUrl: './addset.component.html',
  styleUrls: ['./addset.component.css']
})
export class AddsetComponent implements OnInit {
  // setup initial
  //model: any ;   
  model = new Productsmodel(0, '', '', 0, 0, 0, 0, 0, 0);
  selected = '2';
  liststatus = CSTATUS;
  imageSrc: any;

  constructor(private elementRef: ElementRef, protected service: ConfigService) { }

  onErrorDefaultPic() {
    // this.imageSrc = './../../assets/imgs/defaultimg.jpeg';
    this.imageSrc = 'https://dl.dropbox.com/s/47do5hjkf8tmtbq/1581158330.jpg'
  }

  onChangeFileUpload(fileInput: any) {
    // alert('img change sucess');
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((e) => {
        this.imageSrc = e.target['result'];
      });
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSaveForm() {
    let tmpmethod: Tipos;
    let tmpendpoint: String = 'products';
    if (this.model.idproducts > 0) {
      tmpmethod = Tipos.PUT
      tmpendpoint = `${tmpendpoint}/${this.model.idproducts}`
    } else {
      tmpmethod = Tipos.POST
    }

    this.service.Make(tmpendpoint, tmpmethod, this.model).subscribe((data) => {
      if (data.response) {
        console.dir(data);
        this.service.changeListProductsDataAdd(data.result);
      }
    }, (error) => {
      console.dir(error);
    });
  }
  ngAfterViewInit() {
    // <input type='text' id='loginInput' #abc/>
    // this.abc.nativeElement.value
    // this.elementRef.nativeElement.('fileProductImg').addEventListener('change', this.handleFileSelect.bind(this), false);
  }
  ngOnInit() {
    this.service.productsData.subscribe(res => {
      this.model = res;
      this.selected = this.model.idcstatus > 0 ? this.model.idcstatus.toString() : '1';
    });

  }



}
