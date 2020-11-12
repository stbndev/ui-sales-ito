import { AfterViewInit, ElementRef, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Productsmodel } from "./../../models/productsmodel";
import { Entriesmodel } from "./../../models/entriesmodel";
import { eTipos, eCSTATUS } from "./../../config/enums-global.enum";
import { CSTATUS } from "./../../config/enums-global.enum";
import { ConfigService } from "./../../config/config-service.service";
import { debug } from 'util';

@Component({
  selector: 'app-nvtraddset',
  templateUrl: './nvtraddset.component.html',
  styleUrls: ['./nvtraddset.component.css']
})
export class NvtraddsetComponent implements OnInit {

  model = new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0,0, '', '', '', '', '', '');
  model2: Entriesmodel;
  selected = '1';
  liststatus = CSTATUS;
  imageSrc: any;
  isDisabled = true;
  constructor(private elementRef: ElementRef, protected service: ConfigService) { }

  valuechange(newValue) {
    this.isDisabled = false;
    this.model2.existence = this.model.existence + newValue;
  }

  onCancel() {
    // this.model = new Productsmodel(0, '', '', 0, 0, 0, 0, 0, 0, 'https://dl.dropboxusercontent.com/s/6x9dqmz6ewpdj1w/1581413154.jpeg');
    this.model = new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0,0, '', '', '', '', '', '');
    this.HideElement('divProductAddSet');
  }

  HideElement(iditem) {
    var element = document.getElementById(`${iditem}`);
    // if (element.className === 'hideComponent') {
    //   element.classList.remove("hideComponent");
    //   element.classList.add("showComponent");
    // }
    // else {
      element.classList.remove("showComponent");
      element.classList.add("hideComponent");
    // }
  }

  ShowElement(iditem) {
    var element = document.getElementById(`${iditem}`);
    element.classList.remove("hideComponent");
    element.classList.add("showComponent");
  }

  onDelete(): any {
    let tmpmethod: eTipos;
    let tmpendpoint: String = 'products';

    if (this.model.idproducts > 0) {
      this.model.idcstatus = eCSTATUS.ELIMINADO;
      tmpmethod = eTipos.DELETE
      tmpendpoint = `${tmpendpoint}/${this.model.idproducts}`

      this.service.Make(tmpendpoint, tmpmethod, this.model).subscribe((d) => {
        if (d.flag) {
          this.service.changeListProductsDataAdd(this.model);
          this.HideElement('divProductAddSet');
        }
      }, (error) => {
        return null;
      });
    } else {
      alert('Debe seleccionar un productos');
      return null;
    }
  }

  onEventSelection(event) {
    this.model.idcstatus = event;
  }
  onErrorDefaultPic() {
    // this.imageSrc = './../../assets/imgs/defaultimg.jpeg';
    this.imageSrc = 'https://dl.dropbox.com/s/6x9dqmz6ewpdj1w/1581413154.jpeg'
  }

  onChangeFileUpload(fileInput: any) {
    // alert('img change sucess');
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((e) => {
        this.imageSrc = e.target['result'];
      });
      reader.readAsDataURL(fileInput.target.files[0]);

      let files = this.elementRef.nativeElement.querySelector('#ProfilePhoto').files;
      let formData: FormData = new FormData();

      let file = files[0];
      formData.append('file', file, file.name);

      this.service.Upload('docfile', formData).subscribe(d => {
        if (d.flag) {
          this.model.pathimg = d.data;
        } else {
          alert(d);
        }
      }, (error) => {
        alert(error);
      });
    }
  }

  onSaveForm() {

    let tmpmethod: eTipos;
    let tmpendpoint: String = 'entries';
    // start fill entry object
    this.model2.idproducts = this.model.idproducts;
    // this.model2.unitary_price = this.model.unitary_price;
    this.model2.quantity = this.model.quantity;
    this.model2.idcstatus = this.model.idcstatus;
    this.model2.idcompany = this.model.idcompany;
    // get maker with user credentials logged
    this.model2.maker = 'Angular webapp';
    // end fil entry object
    if (this.model2.identries > 0) {
      tmpmethod = eTipos.PUT
      tmpendpoint = `${tmpendpoint}/${this.model2.identries}`
    } else {
      tmpmethod = eTipos.POST
    }

    this.service.Make(tmpendpoint, tmpmethod, this.model2).subscribe((d) => {
      if (d.flag) {
       // this.HideElement('divProductAddSet');
       this.service.RefreshComponent(true);
        this.HideElement('divProductAddSet');
        // this.ngOnInit();
        // this.service.changeListProductsDataAdd(d.data);
      }
    }, (error) => {
      alert(error);
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

      this.model2 = {
        idcstatus: this.model.idcstatus,
        idproducts: this.model.idproducts,
        identries: 0,
        idcompany: this.model.idcompany,
        id: '',
        name:this.model.name,
        date_add: this.model.date_add,
        date_set: this.model.date_set,
        unitary_cost: this.model.unitary_cost,
        unitary_price: this.model.unitary_price,
        total: 0,
        existence: this.model.existence,
        quantity: this.model.quantity,
        maker: this.model.maker
      }

      // if(!this.model.setup === undefined){
      //   this.model2
      // }
      

      this.selected = this.model.idcstatus > 0 ? this.model.idcstatus.toString() : '1';

      if (this.model2.idproducts > 0) {
        this.ShowElement('divProductAddSet');
      }
    });
  }
}