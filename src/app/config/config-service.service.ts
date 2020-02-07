import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Tipos } from './enumsGlobal';


@Injectable({
  providedIn: 'root'
})

export class ConfigServiceService {
   private _productsSource = new BehaviorSubject<Productsmodel>(new Productsmodel(0, '', '', 0, 0, 0, 0, 0, 0));
   private _listproductsSource = new BehaviorSubject<Productsmodel[]>([]);
   private _todos = new BehaviorSubject<any[]>([]);
   constructor(private http: HttpClient) { }

   changeProductsData(productsargs: Productsmodel){
   	 this._productsSource.next(productsargs);
   }

   changeListProductsData(listproductsargs:[]){
   	 this._listproductsSource.next(listproductsargs)
   }

   changeListProductsDataAdd(pgs: Productsmodel){
   	let found = this._listproductsSource.getValue().find(element => element.idproducts == pgs.idproducts);
    if (found) {
      let tmplist = this._listproductsSource.getValue();
      tmplist.splice(tmplist.indexOf(found), 1);
      tmplist = tmplist.concat(pgs);
      this._listproductsSource.next(tmplist);
    }
    else {
      this._listproductsSource.next(this._listproductsSource.getValue().concat(pgs));
    }
   }
  Get(serviceName: String): Observable<any> {
    return this.http.get(`${this.uriResources}${serviceName}`).pipe(map(this.extractData));
  }

  Make(serviceName: String, tipo: any, data: any): Observable<any> {
    
    switch (tipo) {
      case Tipos.POST:
        return this.http.post(`${this.uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case Tipos.PUT:
        return this.http.put(`${this.uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case Tipos.PATCH:
        return this.http.patch(`${this.uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case Tipos.DELETE:
        return this.http.delete(`${this.uriResources}${serviceName}`).pipe(map(this.extractData));

      default:
        return null;
    }
  }
}
