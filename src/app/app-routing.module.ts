import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'menu', component: MenuPageComponent },
  { path: 'dashBoard', component: DashBoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'registration', component: RegisterComponent,canActivate: [AuthguardGuard] },
  //{ path: 'adminHome', component: AdminHomeComponent },
  {path: 'admin', component: AdminComponent,canActivate: [AuthguardGuard] },
  { path: '',   redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
