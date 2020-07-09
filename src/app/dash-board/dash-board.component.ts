import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule,FormBuilder,FormGroup } from  '@angular/forms';
import { Policy,carousl} from  '../objects';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  PHP_API_SERVER = this.apiService.PHP_API_SERVER;

  carousl:carousl[];
  carouslItems: carousl = {
    cId         :null,
    cName       :null,
    cDiscription:null,
    CImg        :null,
  };
  form: FormGroup;
  uploadResponse;
  add:boolean;
  view:boolean;
  title:string;
  buttonText:string;
  policies:  Policy[];
  selectedPolicy:  Policy  = { id :  null , number:null, amount:  null,img:null};

  constructor(private apiService: ApiServiceService,private http:HttpClient,private fromBuilder:FormBuilder) { }
  uploadForm:FormGroup;

  ngOnInit(): void {
    
    this.add = false;
    this.view = true;
    this.title = "View Carousl";
    this.buttonText = "Add Carousl";

    this.form = this.fromBuilder.group({
      avatar: [''],
      carouslTitle:[''],
      carouslDiscription:['']
    });

    this.getAllCarousl();
  }
  // createOrUpdatePolicy(form){
  //   console.log(this.selectedPolicy);
  //   this.apiService.createPolicy(this.selectedPolicy).subscribe((policy: Policy)=>{
  //     console.log("Policy created, ", policy);
  //   });
  //   }
  // onFileSelect(event){
  //   const file = event.target.files[0];
  //   console.log(file);
  //   this.selectedPolicy.img = file;
  //   console.log(this.selectedPolicy);
  // }

  // onSubmit(){

  //   const formData = new FormData(),
  //   formData.append('myFile',this.uploadForm.get('profile'.value));

  // }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);
    formData.append('carouslTitle', this.form.get('carouslTitle').value);
    formData.append('carouslDiscription', this.form.get('carouslDiscription').value);
    console.log(formData);
    this.apiService.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
          console.log(res);
          this.getAllCarousl();
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  getAllCarousl(){
    this.apiService.readCarousl().subscribe((selectedItem: carousl[])=>{
      this.carousl = selectedItem;
      console.log(selectedItem);
    })
  }

  viewOrAddCarouslShow():void{
    if(this.add){
      this.add = false;
      this.view = true;
      this.title = "View Carousl";
      this.buttonText = "Add Carousl";
    }
    else if(this.view){
      this.add = true;
      this.view = false;
      this.title = "Add Carousl";
      this.buttonText = "View Carousl";
    }
  }

  deleteCarousl(carouslId){
    console.log(carouslId);
    this.apiService.deleteCarousl(carouslId).subscribe((carousl: carousl)=>{
      console.log("Product deleted, ", carousl);
      this. getAllCarousl();
    });
  }
}
