import { Time } from '@angular/common';

export  class  item {
    id: number;
    name:  string;
    size:  string;
    price: number;
    dicsription: string;
    img: string;
   
}
export class carousl{
    cId         :number;
    cName       :string;
    cDiscription:string;
    CImg        :string;
}

export  class  oneItem {
    id: number;
    name:  string;
    size:  string;
    price: number;
    discription: string;
    img: string;
}

export  class  getItemrequest {
    id: number;
}

export interface contactUsForm {
    name            : String;
    eMail           : String;
    contactNumber   : String;
    massage         : String;
    orderType       : String;
}

export class mennu{
    mId             :number;
    mName           :string;
    mDiscription    :string;
    mImg            :string;
    status          :number;
}

export class products{
    pId             :number;
    mId             :number;
    pName           :string;
    discription     :string;
    price           :number;
    pImg            :string;
    pStatus         :number;
}

export  class  Policy {
    id      :   number;
    number  :   number;
    amount  :   number;
    img     :   File;
}

export class oneMennuItem{
    mId             :number;
    mName           :string;
    mDiscription    :string;
    mImg            :string;
    status          :number;
  };

export class specialDeals{
    sdId            :number;
    pID             :number;
    sdName          :string;
    sdDescription   :string;
    sdImg           :string;
    status          :number;
}

export class Users {
    public Id: number;
    public name: string;
    public pwd:string;
    public email:string;
    
    constructor(Id:number,name: string,pwd:string,email:string) {
    this.Id = Id;
    this.name = name;
    this.pwd = pwd;
    this.email = email;
    }
}

export  class  orderDetails {
    token: string;
    price:  number;
    customerName: string;
    customerEmail:string;
    customerPhone:string;
    customerAdressLineOne:string;
    customerAdressLineTwo:string;
    customerAdressCity:string;
    cart:any;
    date:Date;
    time:Date;
    paymentType:string;
    foodReciveType:string;
    //amount:  number;
}

export  class  getOrderDetails {
    orId: string;
    price:  number;
    customerName: string;
    email:string;
    phone:string;
    //customerAdressLineOne:string;
    //customerAdressLineTwo:string;
    //customerAdressCity:string;
    //cart:any;
    date:Date;
    time:Date;
}

export class editOrder {
    orderId:number;
    action:string;
}

export class userMassage {
    cuId:number;
    name:string;
    email:string;
    Contactnumber:number;
    massage:string;
}