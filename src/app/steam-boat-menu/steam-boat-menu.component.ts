import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { mennu,products,oneMennuItem } from  '../objects';
import { oneItem } from  '../objects';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { CommonModule } from '@angular/common';
import {DataService}from '../data.service';


@Component({
  selector: 'app-steam-boat-menu',
  templateUrl: './steam-boat-menu.component.html',
  styleUrls: ['./steam-boat-menu.component.css']
})

export class SteamBoatMenuComponent implements OnInit {
  //PHP_API_SERVER = "http://localhost:8081";
  PHP_API_SERVER = "http://steamboatkitchen.com/demo";
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
    this.dataService.itemAddToCart(product);
    console.log(this.dataService.cart.length);
  }
}
