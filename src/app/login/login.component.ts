import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiServiceService,private router:Router) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  postdata(angForm1){
    this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
    .pipe(first())
    .subscribe(
    data => {
      alert("login succcessfully")
      const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/admin';
      this.router.navigate([redirect]);
      //console.log(data);
    },
    error => {
      alert("User name or password is incorrect")
      //console.log(error);
    });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }


}
