import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Tipos } from './enums-global.enum';
import { Productsmodel } from "./../models/productsmodel";

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  private _productsSource = new BehaviorSubject<Productsmodel>(new Productsmodel(0, '', '', 0, 0, 0, 0, 0, 0));
  private _listproductsSource = new BehaviorSubject<Productsmodel[]>([]);
  private _todos = new BehaviorSubject<any[]>([]);
  productsData = this._productsSource.asObservable()
  listproductsData = this._listproductsSource.asObservable()
  // configUrl = 'https://jsonplaceholder.typicode.com/posts/1/comments';
  _uriResources = 'http://10.211.55.3/poshubdev/api/';
  // uriResources = 'http://localhost/poshubdev/api/';
  constructor(private http: HttpClient) { }

  extractData(res: Response) {
    let body = res;
    // return body || {};
    return body || {};
  }
  changeProductsData(productsargs: Productsmodel) {
    this._productsSource.next(productsargs);
  }

  changeListProductsData(listproductsargs: []) {
    this._listproductsSource.next(listproductsargs)
  }

  changeListProductsDataAdd(pgs: Productsmodel) {
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
    return this.http.get(`${this._uriResources}${serviceName}`).pipe(map(this.extractData));
  }

  Make(serviceName: String, tipo: any, data: any): Observable<any> {

    switch (tipo) {
      case Tipos.POST:
        return this.http.post(`${this._uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case Tipos.PUT:
        return this.http.put(`${this._uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case Tipos.PATCH:
        return this.http.patch(`${this._uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case Tipos.DELETE:
        return this.http.delete(`${this._uriResources}${serviceName}`).pipe(map(this.extractData));

      default:
        return null;
    }
  }

  Upload(serviceName: String, data: any): Observable<any> {
    return this.http.post(`${this._uriResources}${serviceName}`,data).pipe(map(this.extractData));
  }
}
