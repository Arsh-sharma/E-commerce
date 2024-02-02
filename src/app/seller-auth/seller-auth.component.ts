import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  authError: string = ' ';

  showLogin: boolean = false;

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    // console.warn(data);
    this.seller.userSignUp(data);
  }

  Login(data: SignUp): void {
    this.authError = '';
    // console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or password is not correct';
      }
    });
  }

  onLogin() {
    this.showLogin = true;
  }
  onSignup() {
    this.showLogin = false;
  }
}
