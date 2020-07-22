import { Component, OnInit,Inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule,FormBuilder,FormGroup } from  '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { mennu,} from  '../objects';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {
  //PHP_API_SERVER = "http://localhost:8081";
  //PHP_API_SERVER = "http://steamboatkitchen.com/demo";
  PHP_API_SERVER = this.apiService.PHP_API_SERVER;

  menuId:any;
  edit:boolean;
  add:boolean;
  view:boolean;
  title:string;
  buttonText:string;
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

  constructor(private apiService: ApiServiceService,private http:HttpClient,private fromBuilder:FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.add = false;
    this.view = true;
    this.title = "View Menu";
    this.buttonText = "Add Menu";
 

    this.form = this.fromBuilder.group({
      avatar: [''],
      menuName:[''],
      menuDiscription:['']
    });

    this.getMenu();

  }

  viewMenuOrAddMenuShow():void{
    if(this.add){
      this.add = false;
      this.view = true;
      this.title = "View Menu";
      this.buttonText = "Add Menu";
    }
    else if(this.view){
      this.add = true;
      this.view = false;
      this.title = "Add Menu";
      this.buttonText = "View Menu";
    }
  }

  getMenu(){
    this.apiService.readMenu().subscribe((mennuItem: mennu[])=>{
      this.mennu = mennuItem;
      console.log(mennuItem);
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
      formData.append('menuName', this.form.get('menuName').value);
      formData.append('menuDiscription', this.form.get('menuDiscription').value);
      console.log(formData);
      this.apiService.createMennu(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
            console.log(res);
          this.getMenu();
          this.form = null;
        },
        (err) => {  
          console.log(err);
        }
      );
    }
    else{
      const formData = new FormData();
      formData.append('avatar', this.form.get('avatar').value);
      formData.append('menuName', this.form.get('menuName').value);
      formData.append('menuDiscription', this.form.get('menuDiscription').value);
      formData.append('mId', this.menuId);
      console.log(formData);
      this.apiService.editMenu(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
            console.log(res);
          this.getMenu();
          this.form = null;
        },
        (err) => {  
          console.log(err);
        }
      );
    }
    
  }

  deleteMenu(menuId){
    this.apiService.deleteMenu(menuId).subscribe((mennu: mennu)=>{
      console.log("Menu deleted, ", mennu);
      this.getMenu();
    });
  }

  editProductView(menu){
    this.edit = true;
    this.add = true;
    this.view = false;
    this.title = "Edit Menu";
    this.buttonText = "View Menu";

    this.form.controls['menuName'].setValue(menu.mName);
    this.form.controls['menuDiscription'].setValue(menu.mDiscription);
    //this.form.controls['productPrice'].setValue(menu.price);
    //this.form.controls['productMenu'].setValue(this.menu.mName);

    this.menuId = menu.mId;

  }



  openDialog() {
    const dialogRef = this.dialog.open(deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'deleteDialog',
  templateUrl: 'deleteDialog.html',
})
export class deleteDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
