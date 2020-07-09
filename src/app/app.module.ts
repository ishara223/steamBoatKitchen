import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {materialModule} from './material-module';
//import { FlexLayoutModule } from '@angular/flex-layout';
//import { ReactiveFormsModule } from '@angular/forms';
//import { MultiAlertsComponent } from './multi-alerts';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouslComponent } from './carousl/carousl.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SpecialDealsComponent } from './special-deals/special-deals.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { SteamBoatMenuComponent } from './steam-boat-menu/steam-boat-menu.component';
//import { MenuComponent } from './menu/menu.component';
//import { ServiceComponent } from './service/service.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MenuPageComponent } from './menu-page/menu-page.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { MenuDashboardComponent } from './menu-dashboard/menu-dashboard.component';
import { ProducdDashBoardComponent } from './producd-dash-board/producd-dash-board.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CartComponent } from './cart/cart.component';
import { NgxStripeModule } from 'ngx-stripe';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarouslComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    SpecialDealsComponent,
    ContactUsComponent,
    MenuComponent,
    SteamBoatMenuComponent,
    DashBoardComponent,
    MenuPageComponent,
    ContactInfoComponent,
    MenuDashboardComponent,
    ProducdDashBoardComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    CartComponent,
    OrdersComponent,
    
    //MenuComponent,
    //ServiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    GoogleMapsModule,
    FormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    materialModule,
    
    //FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmgT415qD1eSEYFCXGnFtq0UH6iof8F3c'
    }),
    NgxStripeModule.forRoot('pk_test_51GzKsMLQE6y0pUWQgSwok1Vm65OACUwr7gUDMb8kaWAtGwqEEOdY2G8Upvv9rHika37DxGM7mLDzYNq3jw3jtxch00t7vUhuV2'),

    
  ],
  entryComponents: [
    MenuDashboardComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
