import { Component, OnInit } from '@angular/core';
import {DataService}from '../data.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  toggleNav:boolean=false;
  constructor(public dataService: DataService,private router:Router) { }

  ngOnInit(): void {
  }
  cartPageOpen():void{
    if(this.dataService.total>0){
      this.router.navigate(['/cart']);
    }
    
  }

}
