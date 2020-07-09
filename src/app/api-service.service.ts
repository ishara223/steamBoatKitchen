import { Injectable, Output, EventEmitter  } from '@angular/core';
import { HttpClient,HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { carousl,contactUsForm,mennu,Policy,specialDeals,products,getItemrequest,orderDetails,getOrderDetails,editOrder } from  './objects';
import { oneItem } from  './objects';
import { Observable } from  'rxjs';
import { map } from  'rxjs/operators';
//import { Https } from '@angular/common/http';
//import {cart} from './data.service'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  cart:any[];
  redirectUrl: string;
  //PHP_API_SERVER = "http://localhost:8081";
  PHP_API_SERVER = "http://steamboatkitchen.com/demo";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }

  readCarousl(): Observable<carousl[]>{
    return this.httpClient.get<carousl[]>(`${this.PHP_API_SERVER}/api/steamBoat.php`);
  }


  readMenu(): Observable<mennu[]>{
    return this.httpClient.get<mennu[]>(`${this.PHP_API_SERVER}/api/getMenu.php`);
  }

  // getItemrequest:getItemrequest;
  // //getItemrequests= this.getItemrequest;
  // readoneItem(request: getItemrequest): Observable<oneItem[]>{
    
  //   return this.httpClient.post<oneItem[]>(`${this.PHP_API_SERVER}/api/getItem.php`,request);
  // }
  postMedicine(contactUsForm: contactUsForm) {
    console.log(contactUsForm);
    return this.httpClient.post(`${this.PHP_API_SERVER}/api/contactUsFormSubmit.php`, contactUsForm);
  }
  // readproducts(id: number): Observable<products[]>{
    
  //   return this.httpClient.post<products[]>(`${this.PHP_API_SERVER}/api/getItem.php`,id);
  // }
  createPolicy(policy: Policy): Observable<Policy>{
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/create.php`, policy);
  }

  readspecialDeals(): Observable<specialDeals[]>{
  
    return this.httpClient.get<specialDeals[]>(`${this.PHP_API_SERVER}/api/getSpecialDeals.php`);
  }

  public uploadFile(data) {
    let uploadURL = `${this.PHP_API_SERVER}/api/create.php`;
    return this.httpClient.post<any>(uploadURL, data);
  }

  public createMennu(menuData) {
    let uploadURL = `${this.PHP_API_SERVER}/api/createMennu.php`;
    return this.httpClient.post<any>(uploadURL, menuData);
  }

  public addProduct(productData) {
    let uploadURL = `${this.PHP_API_SERVER}/api/addProduct.php`;
    return this.httpClient.post<any>(uploadURL, productData);
  }

  readproductss(mId: number): Observable<products[]>{
    return this.httpClient.post<products[]>(`${this.PHP_API_SERVER}/api/getProducts.php`,mId);
  }

  // deleteMenu(menuId: number){
  //   return this.httpClient.delete<mennu>(`${this.PHP_API_SERVER}/api/deleteMenu.php/?menuId=${menuId}`);
  // }
  deleteMenu(menuId: number){
    return this.httpClient.post<mennu>(`${this.PHP_API_SERVER}/api/deleteMenu.php`,menuId);
  }
  
  public userlogin(username, password) {
    alert(username)
    return this.httpClient.post<any>(this.PHP_API_SERVER + '/api/login.php', { username, password })
    .pipe(map(Users => {
      this.setToken(Users[0].name);
      this.getLoggedInName.emit(true);
      return Users;
    }));
  }

  public userregistration(name,email,pwd) {
    return this.httpClient.post<any>(this.PHP_API_SERVER + '/api/register.php', { name,email, pwd })
    .pipe(map(Users => {
      return Users;
    }));
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }

  public cartCheckout(orderDetails:orderDetails) {
    let uploadURL = `${this.PHP_API_SERVER}/api/placeOrdder.php`;
    return this.httpClient.post<orderDetails>(uploadURL, orderDetails);
  }

  public getOrders(orderStatus:string): Observable<getOrderDetails[]> {
    let uploadURL = `${this.PHP_API_SERVER}/api/getOrder.php`;
    return this.httpClient.post<getOrderDetails[]>(uploadURL, orderStatus);
  }

  public editOrder(editOrder:editOrder) {
    let uploadURL = `${this.PHP_API_SERVER}/api/editOrder.php`;
    return this.httpClient.post<any>(uploadURL, editOrder);
  }

  deleteProduct(productId: number){
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/deleteProduct.php`,productId);
  }
  deleteCarousl(carouslId: number){
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/deleteCarousl.php`,carouslId);
  }
}
