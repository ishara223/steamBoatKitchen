import { Injectable } from '@angular/core';
import { reduce } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cart:any = [];
  total:number = 0;
  itemAddToCart(product):void{
    this.total =0;
    this.cart.push({product:product,quentity:1,price:+product.price,pName:product.pName,pId:product.pId})
    console.log(this.cart);
    // let sum = this.cart.map(o => o.price).reduce((a, c) => { return a + c });
    // console.log(sum);
    // for (var i = 0; i<this.cart.length;i++){
    //   this.total= this.total+ this.cart[i].price;
    //   this.total = this.total + this.cart[i].price;
    //   //console.log("price" + this.cart[i].price);
    //   console.log("total"+this.total.toFixed(2));
    //   //console.log("total"+this.total);
    // }
    console.log (this.sum());
  }

  sum():any {
    this.total =0;
    for (var i = 0; i<this.cart.length;i++){
      //this.total= this.total+ this.cart[i].price;
      this.total = this.total + (this.cart[i].price* this.cart[i].quentity);
      //console.log("price" + this.cart[i].price);
      //console.log("total"+this.total.toFixed(2));
      //console.log("total"+this.total);
    }
    this.total = +this.total.toFixed(2);
  }

  removeFromCart(cartObject):void{
    console.log(cartObject);
    //this.cart = this.cart.filter(({pName}) => pName !== cartObject.pName);
    this.cart = this.cart.filter(({pId}) => pId !== cartObject.pId);    
    console.log(this.cart);
    console.log (this.sum());
  }
}
