import { Component, OnInit } from '@angular/core';
import { Login, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private user: UserService, private product: ProductService) {}

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
        this.authError = 'Enter Valid Credentials';
      } else {
        // console.log('hi');
        this.localCartToRemoteCart();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogIn() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;

        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            console.log(cartData);
          }
        });
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    this.product.getCartList(userId);
  }
}
