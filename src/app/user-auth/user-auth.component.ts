import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.authError = "Enter Valid Credentials"
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogIn() {
    this.showLogin = true;
  }
}
