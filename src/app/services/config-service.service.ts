import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { eTipos, CSTATUS_PRODUCTS, eCSTATUS } from '../config/enums-global.enum';
import { Productsmodel, Usersmodel } from "../models/models-sales";
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseNocheServices } from '../models/response-ws';
import { ILogin, IPage, IProducts, IUser } from '../models/interfaces-sales';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  public flagSpinner = new BehaviorSubject<boolean>(null);
  public user:Observable<IUser>;

  // private _uriResources = 'http://noche.somee.com/api/';
  private _uriResources = 'https://localhost:5001/api/';

  private _listproductsSource = new BehaviorSubject<IProducts[]>([]);
  private _listProductsInCart = new BehaviorSubject<Productsmodel[]>([]);
  private _flag = new BehaviorSubject<Boolean>(false);
  private _todos = new BehaviorSubject<any[]>([]);
  private _productsSource = new BehaviorSubject<Productsmodel>(
    new Productsmodel(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '')
  );

   userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('user')));
   productsData = this._productsSource.asObservable();
   listproductsData = this._listproductsSource.asObservable();
   listProductsInCart = this._listProductsInCart.asObservable();
   refresh = this._flag.asObservable();

  constructor(private http: HttpClient, private cookies: CookieService,private router: Router) { 
    this.user = this.userSubject.asObservable();
  }

  public get userData() { return this.userSubject.value; }

  Get(serviceName: String): Observable<ResponseNocheServices> {
    let token = this.userData.token;
    let headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    // return this.http.get<ResponseNocheServices>(`${this._uriResources}${serviceName}`, { headers }).pipe(map(this.extractData));
    return this.http.get<ResponseNocheServices>(`${this._uriResources}${serviceName}`, { headers }).pipe(map(rns => rns));
  }

  Login(serviceName: String,  data: ILogin): Observable<ResponseNocheServices> {
    return this.http.post<ResponseNocheServices>(`${this._uriResources}${serviceName}`, data).pipe(
      map(res => {
        // change value by enum CSTATUS
        if (res.flag === eCSTATUS.OK) {
          const user:IUser = res.data;
          user.token = res.message;
          localStorage.setItem('user',JSON.stringify(user));
        }
        return res;
      }));
  }
  Logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  Make(serviceName: String, tipo: any, data: any): Observable<ResponseNocheServices> {
    // let tmpToken = this.userData.token;
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `Bearer ${tmpToken}`);

    switch (tipo) {
      case eTipos.POST:
        return this.http.post<ResponseNocheServices>(`${this._uriResources}${serviceName}`, data).pipe(map(rns => rns));

      case eTipos.PUT:
        return this.http.put<ResponseNocheServices>(`${this._uriResources}${serviceName}`, data).pipe(map(rns => rns));

      case eTipos.PATCH:
        return this.http.patch<ResponseNocheServices>(`${this._uriResources}${serviceName}`, data).pipe(map(rns => rns));

      case eTipos.DELETE:
        return this.http.delete<ResponseNocheServices>(`${this._uriResources}${serviceName}`).pipe(map(rns => rns));

      default:
        return null;
    }
  }
  buildingToken(d: any, pagetitle: string) {
    this.cookies.deleteAll();
    this.changeUserInfo(d.data, pagetitle);
    this.cookies.set("token", d.message);

    let info = new Object();
    info = { 'user': d.data };
    this.cookies.set('info', JSON.stringify(info));
    // let tmp0 = { 'user': 'esteban blanquel' };
    // let tmp1 = { 'data': 'aaaAAAbbbBBB' };
    // root[0] = tmp0;
    // root[1] = tmp1;
    // let titleUser = 'user';
    // user = {
    //   [titleUser]: root[0],
    //   ['data3']: root[1]
    // };
    // this.descryptedToken(d.message);

  }

  changeUserInfo(userInfo: any, pagetitle: string) {
    userInfo.pagetitle = pagetitle,
    this.userSubject.next(userInfo);
    //this._userInfo.next(userInfo);
  }

  adjustPage(pagetitle: string):IPage {
    let p : IPage ;
    p.name = pagetitle;
      
    switch (pagetitle) {
      case 'products':
        p.pagetitle = 'Productos';
        break;
      case 'sales':
        p.pagetitle = 'Ventas';
        break;
      case 'entries':
        p.pagetitle = 'Inventarios';
        break;
      case 'shrinkages':
        p.pagetitle = 'Perdidas';
        break;
      default:
        p.pagetitle = '';
        break;
    }
    
    return p;
  }
  
  
  descryptedToken(token: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    // let obj = JSON.parse(decodedToken.data);  
    // this.cookies.set("token_descrypted", (decodedToken.data));
    // let x = JSON.parse( this.cookies.get("token_descrypted"));
    return decodedToken;
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

  ProductsInCart(product: Productsmodel, remove?: boolean, clear?: boolean) {
    let tmplist: any;
    if (clear) {
      this._listProductsInCart.next([]);
    } else if (remove) {
      const id = this._listProductsInCart.getValue().indexOf(product);
      // if(id > -1){
      const itemremove = this._listProductsInCart.getValue().splice(id, 1);
      tmplist = this._listProductsInCart.getValue();
      //}  
    } else {
      let found = this._listProductsInCart.getValue().find(element => element.idproducts == product.idproducts);

      if (found) {
        tmplist = this._listProductsInCart.getValue();
      } else {
        tmplist = this._listProductsInCart.getValue().concat(product);
      }
    }
    this._listProductsInCart.next(tmplist);
  }

  changeListProductsDataAdd(item: IProducts) {
    let found = this._listproductsSource.getValue().find(element => element.idproducts == item.idproducts);
    if (found) {
      let tmplist = this._listproductsSource.getValue();
      tmplist.splice(tmplist.indexOf(found), 1);
      tmplist = tmplist.concat(item);
      this._listproductsSource.next(tmplist);
    }
    else {
      this._listproductsSource.next(this._listproductsSource.getValue().concat(item));
    }
  }
  handleError(): void {

  }


  Upload(serviceName: String, data: any): Observable<any> {
    return this.http.post(`${this._uriResources}${serviceName}`, data).pipe(map(this.extractData));
  }



}
