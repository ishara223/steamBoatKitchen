import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  loginbtn:boolean;
  logoutbtn:boolean;

  constructor(private dataService: ApiServiceService) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn()){
      console.log("loggedin");
      this.loginbtn=false;
      this.logoutbtn=true
    }else{
      this.loginbtn=true;
      this.logoutbtn=false
    }
  }
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
    }
    logout(){
    this.dataService.deleteToken();
    window.location.href = window.location.href;
    }

  ngOnInit(): void {
  }

}
