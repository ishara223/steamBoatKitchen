import { Component, OnInit,ChangeDetectorRef,OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  mobileQuery: MediaQueryList;
  menu:boolean;
  product:boolean;
  carousl:boolean;
  orders:boolean;
  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  // fillerContent = Array.from({length: 50}, () =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private apiService: ApiServiceService,
    private router:Router) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
    this.orders = true;
    this.menu = false;
    this.product = false;
    this.carousl = false;
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  menuDashboardView():void {
    this.orders = false;
    this.menu = true;
    this.product = false;
    this.carousl = false;
  }
  producrDashboardView():void {
    this.orders = false;
    this.menu = false;
    this.product = true;
    this.carousl = false;
  }
  carouslDashboardView():void {
    this.orders = false;
    this.menu = false;
    this.product = false;
    this.carousl = true;
  }
  ordersDashboardView():void {
    this.orders = true;
    this.menu = false;
    this.product = false;
    this.carousl = false;
  }

  logout(){
    this.apiService.deleteToken();
    window.location.href = window.location.href;
    this.router.navigate(['/login']);
  }
}
