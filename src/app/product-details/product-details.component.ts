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
  }

  handleQuantity(val: string) {
    if (this.productQty < 20 && val === 'plus') {
      this.productQty += 1;
    } else if (this.productQty > 1 && val === 'min') {
      this.productQty -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQty;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:cart = { ...this.productData, userId,productId:this.productData.id}
        delete cartData.id

        this.product.addToCart(cartData).subscribe(()=>{})
      }
     
    }
  }

  removeToCart(productId: string) {
    this.product.removeFromCart(productId);
    this.removeCart = false;
  }
}
