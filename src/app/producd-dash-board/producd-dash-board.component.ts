import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { mennu,products} from  '../objects';
import { FormsModule,FormBuilder,FormGroup } from  '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';

@Component({
  selector: 'app-producd-dash-board',
  templateUrl: './producd-dash-board.component.html',
  styleUrls: ['./producd-dash-board.component.css']
})
export class ProducdDashBoardComponent implements OnInit {

  PHP_API_SERVER = this.apiService.PHP_API_SERVER;

  productId:any;
  edit:boolean;
  add:boolean;
  view:boolean;
  title:string;
  buttonText:string;
  menuId:number;
  form: FormGroup;
  uploadResponse;

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
  constructor(private apiService: ApiServiceService,private httpClient: HttpClient,private fromBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.edit = false;
    this.add = false;
    this.view = true;
    this.title = "View Product";
    this.buttonText = "Add Product";

    this.form = this.fromBuilder.group({
      avatar: [''],
      productName:[''],
      productDiscription:[''],
      productMenu:[''],
      productPrice:['']
    });

    this.getMenu();
    //this.getProducts(1);
  }

  getMenu(){
    this.apiService.readMenu().subscribe((mennuItem: mennu[])=>{
      this.mennu = mennuItem;
      console.log(mennuItem);
      this.getProducts(this.mennu[0].mId);
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    if(!this.edit){
      const formData = new FormData();
      formData.append('avatar', this.form.get('avatar').value);
      formData.append('productName', this.form.get('productName').value);
      formData.append('productDiscription', this.form.get('productDiscription').value);
      formData.append('productMenu', this.form.get('productMenu').value);
      formData.append('productPrice', this.form.get('productPrice').value);
      console.log(this.form);
      this.apiService.addProduct(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
            console.log(res);
        },
        (err) => {  
          console.log(err);
        }
      );
    }
    else{
      const formData = new FormData();
      formData.append('avatar', this.form.get('avatar').value);
      formData.append('productName', this.form.get('productName').value);
      formData.append('productDiscription', this.form.get('productDiscription').value);
      formData.append('productPrice', this.form.get('productPrice').value);
      formData.append('pId',this.productId);
      console.log(this.form);
      this.apiService.editProduct(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
            console.log(res);
        },
        (err) => {  
          console.log(err);
        }
      );
    }
  }

  getProducts(id:number): void {
    this.menuId=id;
    this.apiService.readproductss(id).subscribe((productItems: products[])=>{
      this.products = productItems;
      console.log(productItems);
      //this.show = true;
    })
    //this.readOneMenuItem(id);
  }

  viewOrAddProductShow():void{
    if(this.add){
      this.add = false;
      this.view = true;
      this.title = "View Product";
      this.buttonText = "Add Product";
    }
    else if(this.view){
      this.add = true;
      this.view = false;
      this.title = "Add Product";
      this.buttonText = "View Product";
    }
  }

  deleteProduct(productId){
    console.log(productId);
    this.apiService.deleteProduct(productId).subscribe((products: products)=>{
      console.log("Product deleted, ", products);
      this.getProducts(this.menuId);
    });
  }

  editProductView(product){
    this.edit = true;
    this.add = true;
    this.view = false;
    this.title = "Edit Product";
    this.buttonText = "View Product";

    this.form.controls['productName'].setValue(product.pName);
    this.form.controls['productDiscription'].setValue(product.discription);
    this.form.controls['productPrice'].setValue(product.price);
    this.form.controls['productMenu'].setValue(this.mennuItems.mName);

    this.productId = product.pId;

  }

}
