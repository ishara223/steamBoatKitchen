import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { mennu,products,oneMennuItem } from  '../objects';
import { oneItem } from  '../objects';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { CommonModule } from '@angular/common';
import {DataService}from '../data.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-steam-boat-menu',
  templateUrl: './steam-boat-menu.component.html',
  styleUrls: ['./steam-boat-menu.component.css']
})

export class SteamBoatMenuComponent implements OnInit {
  //PHP_API_SERVER = "http://localhost:8081";
  PHP_API_SERVER = this.apiService.PHP_API_SERVER;
  menuId:number;
  mennu:mennu[];
  mennuItems: mennu = {
    mId             :null,
    mName           :null,
    mDiscription    :null,
    mImg            :null,
    status          :null,
  };

  products:products[];
  productItems:products = {
    pId             :null,
    mId             :null,
    pName           :null,
    discription     :null,
    price           :null,
    pImg            :null,
    pStatus         :null,
  };
  oneMennuItem:oneMennuItem[];
  menuItem: oneMennuItem = {
    mId             :null,
    mName           :null,
    mDiscription    :null,
    mImg            :null,
    status          :null,
  };
  cart:any = [];
  progress: number = 0;


  //menuItem:this.menuItem;
  constructor(private apiService: ApiServiceService,private httpClient: HttpClient,private dataService: DataService) {

  }

  ngOnInit(): void {

    //this.getProducts(5);
    //this.mennu = undefined;
    this.getMenu();
    ///this.getProducts(+this.mennu['mId']);

    console.log(this.mennu);
  }

  readproductss(id: number): Observable<products[]>{
    return this.httpClient.post<products[]>(`${this.PHP_API_SERVER}/api/getProducts.php`,id);
  }

  getMenu(){
    this.apiService.readMenu().subscribe((mennuItem: mennu[])=>{
      this.mennu = mennuItem;
      console.log(this.mennu);
      //return this.mennu;
      this.getProducts(this.mennu[0].mId);
    })

  }

  getProducts(id:number): void {
    this.menuId=id;
    this.readproductss(id).subscribe((productItems: products[])=>{
      this.products = productItems;
      console.log(productItems);
      //this.show = true;
    })
    this.readOneMenuItem(id);
  }
  // getProducts(id:number): void {
  //   this.menuId=id;
  //   this.readproductss(id).subscribe(

  //     (event: HttpEvent<any>)=>{
  //       console.log('Request has been made!');
  //     switch (event.type) {
  //       case HttpEventType.Sent:
  //         console.log('Request has been made!');
  //         break;
  //       case HttpEventType.ResponseHeader:
  //         console.log('Response header has been received!');
  //         break;
  //       case HttpEventType.UploadProgress:
  //         this.progress = Math.round(event.loaded / event.total * 100);
  //         console.log(`Uploaded! ${this.progress}%`);
  //         break;
  //       case HttpEventType.Response:
  //         console.log('User successfully created!', event.body);
  //         setTimeout(() => {
  //           this.progress = 0;
  //         }, 1500);
  //     }

  //     //this.show = true;
  //     },(productItems: products[])=>{
  //       this.products = productItems;
  //       console.log(productItems);
  //     },
  //   )
  //   this.readOneMenuItem(id);
  // }

  readMenuItem(id: number): Observable<oneMennuItem[]>{

    return this.httpClient.post<oneMennuItem[]>(`${this.PHP_API_SERVER}/api/readOneMenuItem.php`,id);
  }

  readOneMenuItem(id: number):void {
    this.menuId=id;
    this.readMenuItem(id).subscribe((menuItem: oneMennuItem[])=>{
      this.oneMennuItem = menuItem;
      console.log(menuItem);
      //this.show = true;
    })
  }

  itemAddToCart(product):void{
    let item1 = this.dataService.cart.find(i => i.product.pId === product.pId);
    console.log(item1);
    if(item1 == undefined){
      this.dataService.itemAddToCart(product);
      console.log(this.dataService.cart.length);
    }
    else{
      let index = this.dataService.cart.indexOf(item1);
      console.log(index);
      // console.log(this.apiService.cart[index]);
      // this.apiService.cart[index].quentity = item1.quentity + 1;
      // console.log(this.apiService.cart[index]);
      const item = this.dataService.cart.filter(i => i.product.pId === product.pId)[0];
      if(item){
        console.log(item);
        item.quentity = item.quentity + 1;
        console.log(item);
        console.log(this.dataService.cart);
      }
    }


  }
}
