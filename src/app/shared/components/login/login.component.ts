import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminData: Admin[] = [];
  username: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3),
    ]),
  });

  get formLoginValidate() {
    return this.formLogin.controls;
  }

  ngOnInit(): void {
  }

  login() {
    this._AuthService.login(this.formLogin.value.username, this.formLogin.value.password).pipe(first())
      .subscribe(
        (data) => {
          this.adminData = data;
          this.username = this.adminData[0].username;
          const redirect = this._AuthService.redirectUrl
            ? this._AuthService.redirectUrl
            : "/";
          this._Router.navigate([redirect]);
        },
        (error) => {
          alert("يوجد خطأ في الاسم او الرقم السري",);
          console.log(error)
        }
      );
  }

}
