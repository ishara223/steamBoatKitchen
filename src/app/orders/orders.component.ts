import { Component, OnInit } from '@angular/core';
import { getOrderDetails,editOrder } from '../objects';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderStatus:string;
  getorderDetails:getOrderDetails[];
  getOrderDetailsItems: getOrderDetails = {
    orId: null,
    price: null,
    customerName: null,
    email:null,
    phone:null,
    //customerAdressLineOne:null,
    //customerAdressLineTwo:null,
    //customerAdressCity:null,
    //cart:any;
    date:null,
    time:null,
  }
  editOrder:editOrder = {
    orderId:null,
    action:null
  };
  editOrderResponse:any;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.orderStatus = "Recived";
    this.getOrder(this.orderStatus);
  }
  getOrder(orderStatus){
    this.apiService.getOrders(orderStatus).subscribe((getOrderDetailsItems: getOrderDetails[])=>{
      this.getorderDetails = getOrderDetailsItems;
      console.log(this.getorderDetails);
      this.orderStatus = orderStatus;
      //this.show = true;
  })
    
  }

  editOrderStatus(orderId,action,orderStatus){
    this.editOrder.orderId = orderId;
    this.editOrder.action = action;
    this.orderStatus = orderStatus;
    //console.log('this.orderStatus')
    this.apiService.editOrder(this.editOrder).subscribe(
      (res) => {
        this.editOrderResponse = res;
          console.log(res);
          alert(this.editOrderResponse.message)
          this.getOrder(orderStatus);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

}
