import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import {userMassage} from '../objects';
import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usermassage',
  templateUrl: './usermassage.component.html',
  styleUrls: ['./usermassage.component.css']
})
export class UsermassageComponent implements OnInit {

  PHP_API_SERVER = this.apiService.PHP_API_SERVER;

  userMassage:userMassage[];
  userMassageItems: userMassage = {
    cuId           :null,
    name           :null,
    email          :null,
    Contactnumber  :null,
    massage        :null,
  };

  constructor(private apiService: ApiServiceService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getAllMassages();
  }

  getAllMassages(){
    this.apiService.readUserMassages().subscribe((selectedItem: userMassage[])=>{
      this.userMassage = selectedItem;
      console.log(selectedItem);
    })
  }

}
