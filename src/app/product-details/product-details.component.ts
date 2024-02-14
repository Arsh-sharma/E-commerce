import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQty: number = 1;
  removeCart: boolean = false;
  cartData: product | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');

    productId &&
      this.product.getDetails(productId).subscribe((result) => {
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => productId === item.id);
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });

    let user = localStorage.getItem('user');
    if (user) {
      // console.log("hello");
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);
      this.product.cartDataQty.subscribe((res) => {
        let items = res.filter(
          (item: product) =>
            productId?.toString() === item.productId?.toString()
        );

        if (items.length) {
          // console.log(items)
          this.cartData = items[0];
          this.removeCart = true;
        }
      });
    }
  }

  handleQuantity(val: string) {
    if (this.productQty < 20 && val === 'plus') {
      this.productQty += 1;
    } else if (this.productQty > 1 && val === 'min') {
      this.productQty -= 1;
    }
  }

  addToCart() {
    // console.log('there');
    if (this.productData) {
      // console.log('there1');
      this.productData.quantity = this.productQty;
      if (!localStorage.getItem('user')) {
        // console.log('there2');

        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // console.log('here');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;

        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            // console.log('hi');
            // console.log(res);
            this.product.getCartList(userId);
            // console.log(data);
            // console.log('hiiiiiiiii');
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: string) {
    // console.log('Hiiiiiiiiiiiiiiiiiiiiiii');
    if (!localStorage.getItem('user')) {
      this.product.removeFromCart(productId);
      this.removeCart = false;
    } else {
      this.removeCart = false;
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData &&
        this.product.removeLoginCart(this.cartData.id).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
          }
        });
    }
  }
}
