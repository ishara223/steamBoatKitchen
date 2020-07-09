import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService}from '../data.service';
import { reduce } from  'rxjs/operators';
import { Observable } from  'rxjs';
import { ApiServiceService } from '../api-service.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { FormGroup, FormBuilder, Validators,FormControl } from "@angular/forms";
import { orderDetails } from  '../objects';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

   
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})


export class CartComponent implements OnInit {

  cardPayment:boolean;
  payAtAtore:boolean;

  orderDetails:  orderDetails  = { 
    token :  null ,
    price:null,
    customerName:null,
    customerEmail:null,
    customerPhone:null,
    customerAdressLineOne:null,
    customerAdressLineTwo:null,
    customerAdressCity:null,
    cart:null,
    date:null,
    time:null,
    paymentType:null,
    foodReciveType:null,
  };
  //
  elements: Elements;
  card: StripeElement;
 
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
 
  stripeTest: FormGroup;
  //

  cart:any = [];
  token:any;

  // email = new FormControl('', [Validators.required, Validators.email]);
  // name = new FormControl('',[Validators.required]);
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
  today = new Date();
  step = 0;
  isDisabledState: boolean = true;

  constructor(public dataService: DataService,
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private router:Router,
    private datePipe: DatePipe,
    private _bottomSheet: MatBottomSheet) {
      //this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
      this.today = new Date();
    }

  handler:any = null;

  ngOnInit(): void {
    //this.cart = this.dataService.cart;
    //     let total = [0, 1, 2, 3].reduce((accumulator, currentValue) => accumulator + currentValue);
    // console.log(total);
    this.cardPayment = false;
    this.payAtAtore = false;
    this.loadStripe();

    this.stripeTest = this.fb.group({
      name: new FormControl(this.stripeTest,[Validators.required]),
      email:new FormControl(this.stripeTest, [Validators.required, Validators.email]),
      phoneNumber:new FormControl(),
      adressLineOne:new FormControl(),
      adressLineTwo:new FormControl(),
      city:new FormControl()
    });

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }

  getErrorMessage() {
    if (this.stripeTest.hasError('required')) {
      return 'You must enter a value';
    }

    return this.stripeTest.hasError('email') ? 'Not a valid email' : '';
  }


  sum(key) {
    return reduce((a, b) => a + (b[key] || 0), 0);
  }

  removeFromCart(cart):void{
    this.dataService.removeFromCart(cart);
    if(this.dataService.total == 0){
      this.router.navigate(['/menu']);
    }
  }

  plusOne(item){
    let index = this.dataService.cart.indexOf(item);
    item.quentity = item.quentity + 1;
    this.dataService.cart[index] = item;
    this.dataService.sum();
    console.log(this.dataService.cart);
  }

  minasOne(item){
    let index = this.dataService.cart.indexOf(item);
    if(item.quentity>1){
      item.quentity = item.quentity - 1;
      this.dataService.cart[index] = item;
      this.dataService.sum();
    }
    console.log(this.dataService.cart);
  }

  // pay(amount) {    
  //   var tokenID;
  //   var handler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_lql3oDI8zzPnSPKIUOdpK0xE003c8OY9oZ',
  //     locale: 'auto',
  //     token: function (token: any) {
  //       // You can access the token ID with `token.id`.
  //       // Get the token ID to your server-side code for use.
  //       this.token = token.id;
  //       //this.apiService.cartCheckout(token.id);
  //       var tokenID = token.id;
  //       console.log(tokenID);
  //       alert('Token Created!!');
  //     }
      
  //   });
  //   console.log(tokenID);
  //   handler.open({
  //     name: 'Steam Boat Kitchen',
  //     description: '2 widgets',
  //     amount: amount * 100
  //   });
    
  //   console.log(handler);
  //   //return this.token;
  // }

  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          //key: 'pk_test_lql3oDI8zzPnSPKIUOdpK0xE003c8OY9oZ',
          key:'pk_test_51GzKsMLQE6y0pUWQgSwok1Vm65OACUwr7gUDMb8kaWAtGwqEEOdY2G8Upvv9rHika37DxGM7mLDzYNq3jw3jtxch00t7vUhuV2',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
  placeOrder(orderDetails:  orderDetails):void{
    this.apiService.cartCheckout(orderDetails).subscribe(
      (res) => {
        //this.uploadResponse = res;
          console.log(res);
        //this.getMenu();
        //this.form = null;
        //alert ('Order placed');
        this.openBottomSheet();
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    const total = this.dataService.total;

    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          let date: Date = new Date();  
          let time: Date = new Date('h:MM:ss TT');
          console.log("Date = " + date);
          //let dateFormat = require('dateformat');
          //let now = new Date('yyyy/MM/dd');
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          this.orderDetails.customerName          = this.stripeTest.get('name').value;
          this.orderDetails.customerEmail         = this.stripeTest.get('email').value;
          this.orderDetails.customerPhone         = this.stripeTest.get('phoneNumber').value;
          this.orderDetails.customerAdressLineOne = this.stripeTest.get('adressLineOne').value;
          this.orderDetails.customerAdressLineTwo = this.stripeTest.get('adressLineTwo').value;
          this.orderDetails.customerAdressCity    = this.stripeTest.get('city').value;

          this.orderDetails.token = result.token.id;
          this.orderDetails.price = this.dataService.total;
          this.orderDetails.cart = this.dataService.cart;

          //this.orderDetails.date = formatDate(new Date(),value;Date, 'yyyy/MM/dd', 'en');
          this.orderDetails.date =  date;
          this.orderDetails.time = time;

          this.placeOrder(this.orderDetails);
          //this.token = result.token.id;dateFormat(now, "dd, mm, yyyy, h:MM:ss TT"); 
          console.log(result.token.id);
          console.log(result.token);
          console.log(this.orderDetails);

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);

        }
      });
  }

  getStripeToken() {
    const name = this.stripeTest.get('name').value;
    //const total = this.dataService.total;
  
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          let date: Date = new Date();  
          let time: Date = new Date('h:MM:ss TT');
          console.log("Date = " + date);
          //let dateFormat = require('dateformat');
          //let now = new Date('yyyy/MM/dd');
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          /*this.orderDetails.customerName = this.stripeTest.get('name').value;
          this.orderDetails.customerEmail = this.stripeTest.get('email').value;
          this.orderDetails.token = result.token.id;
          this.orderDetails.price = this.dataService.total;
          this.orderDetails.cart = this.dataService.cart;*/
          //this.orderDetails.date = formatDate(new Date(),value;Date, 'yyyy/MM/dd', 'en');
          /*this.orderDetails.date =  date;
          this.orderDetails.time = time;
          this.placeOrder(this.orderDetails);*/
          this.token = result.token.id;/*dateFormat(now, "dd, mm, yyyy, h:MM:ss TT"); */
          //console.log(result.token.id);
          console.log(result.token);
          //console.log(this.orderDetails);
          
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          //return result.error.message;
        }
      });
    console.log(this.token);  
  }
  

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setValuesToOrderDetails(){
    this.nextStep();

    let date: Date = new Date();  
    let time: Date = new Date('h:MM:ss TT');

    this.orderDetails.customerName          = this.stripeTest.get('name').value;
    this.orderDetails.customerEmail         = this.stripeTest.get('email').value;
    this.orderDetails.customerPhone         = this.stripeTest.get('phoneNumber').value;
    this.orderDetails.customerAdressLineOne = this.stripeTest.get('adressLineOne').value;
    this.orderDetails.customerAdressLineTwo = this.stripeTest.get('adressLineTwo').value;
    this.orderDetails.customerAdressCity    = this.stripeTest.get('city').value;
    //this.orderDetails.token = result.token.id;
    this.orderDetails.price                 = this.dataService.total;
    this.orderDetails.cart                  = this.dataService.cart;
    this.orderDetails.date                  =  date;
    this.orderDetails.time                  = time;
    if(this.orderDetails.paymentType == 'Card payment'){
      this.cardPayment = true;
      this.payAtAtore = false;
      //this.loadStripe();
    }
    else if(this.orderDetails.paymentType == 'Pay at store'){
      this.cardPayment = false;
      this.payAtAtore = true;
    }
    console.log(this.orderDetails);
    
  }

  payAtStore(){
    this.placeOrder(this.orderDetails);
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(bottomSheet);
  }
}

@Component({
  selector: 'bottomSheet',
  templateUrl: 'bottomSheet.html',
})
export class bottomSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<bottomSheet>,private router:Router,) {}

  openLink(): void {
    this._bottomSheetRef.dismiss();
    //event.preventDefault();
    this.router.navigate(['/menu']);
  }
}
