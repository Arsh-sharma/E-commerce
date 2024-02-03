import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isLoginError = new EventEmitter<boolean>(false);
  isSelleraloggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    // console.log('Service called');

    return this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSelleraloggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        console.log(result);
      });

    // return false;
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSelleraloggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    console.log(data);

    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {
          console.warn('user loggedin');
        } else {
          console.warn('fail');
          this.isLoginError.emit(true);
        }
      });

    //api call code will be here
  }
}
