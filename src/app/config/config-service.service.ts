import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { eTipos, eCSTATUS } from './enums-global.enum';
import { Productsmodel } from "./../models/productsmodel";
import { Usersmodel } from "./../models/usersmodel";
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  // private _productsSource = new BehaviorSubject<Productsmodel>(new Productsmodel(0, '', '', 2, 0, 0, 0, 0, 0, 'https://dl.dropboxusercontent.com/s/6x9dqmz6ewpdj1w/1581413154.jpeg'));
  private _productsSource = new BehaviorSubject<Productsmodel>(
    new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '')
  );

  private _listproductsSource = new BehaviorSubject<Productsmodel[]>([]);
  private _flag = new BehaviorSubject<Boolean>(false);
  private _todos = new BehaviorSubject<any[]>([]);
  private _userInfo = new BehaviorSubject<Usersmodel>(new Usersmodel('', '', '', '', '', 0));

  productsData = this._productsSource.asObservable();
  listproductsData = this._listproductsSource.asObservable();
  refresh = this._flag.asObservable();
  userInfo = this._userInfo.asObservable();
  // _uriResources = ' http://azul200.azurewebsites.net/api/';
  // https://localhost:44332/weatherforecast
  _uriResources = 'https://localhost:44332/api/';


  constructor(private http: HttpClient, private cookies: CookieService) { }

  buildingToken(data: any, pagetitle: string) {
    this.cookies.deleteAll();
    this.changeUserInfo(data.result, pagetitle);
    this.cookies.set("token", data.message);

    // let info = new Object();
    // info = { 'user': data.result };

    // this.cookies.set('info', JSON.stringify(info));
    // let tmp0 = { 'user': 'esteban blanquel' };
    // let tmp1 = { 'data': 'aaaAAAbbbBBB' };
    // root[0] = tmp0;
    // root[1] = tmp1;
    // let titleUser = 'user';
    // user = {
    //   [titleUser]: root[0],
    //   ['data3']: root[1]
    // };
    // this.descryptedToken(token);

  }

  changeUserInfo(userInfo: any, pagetitle: string) {
    userInfo.pagetitle = pagetitle,
      this._userInfo.next(userInfo);
  }

  setTokens(token: any) {
    // this.cookies.delete("token");


  }

  descryptedToken(token: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    // let obj = JSON.parse(decodedToken.data);  
    this.cookies.set("token_descrypted", decodedToken.data);
  }

  getToken() {
    return this.cookies.get("token");
  }

  extractData(res: Response) {
    let body = res;
    return body || {};
  }

  RefreshComponent(flag: boolean) {
    this._flag.next(flag);
  }

  changeProductsData(productsargs: Productsmodel, setup?: boolean) {
    if (setup) {
      productsargs.setup = setup;
    }
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

    let tmpToken = this.getToken();

    let headers = new HttpHeaders().set("Authorization", `Bearer ${tmpToken}`);

    return this.http.get(`${this._uriResources}${serviceName}`, { headers })
      .pipe(map(this.extractData));
  }

  Make(serviceName: String, tipo: any, data: any): Observable<any> {

    let tmpToken = this.getToken();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${tmpToken}`);

    switch (tipo) {
      case eTipos.POST:
        return this.http.post(`${this._uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case eTipos.PUT:
        return this.http.put(`${this._uriResources}${serviceName}`, data, { headers }).pipe(map(this.extractData));

      case eTipos.PATCH:
        return this.http.patch(`${this._uriResources}${serviceName}`, data).pipe(map(this.extractData));

      case eTipos.DELETE:
        return this.http.delete(`${this._uriResources}${serviceName}`).pipe(map(this.extractData));

      default:
        return null;
    }
  }

  Upload(serviceName: String, data: any): Observable<any> {
    return this.http.post(`${this._uriResources}${serviceName}`, data).pipe(map(this.extractData));
  }



}
