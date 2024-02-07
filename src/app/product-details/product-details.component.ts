import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQty: number = 1;

  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');

    productId &&
      this.product.getDetails(productId).subscribe((result) => {
        this.productData = result;
      });
  }

  handleQuantity(val: string) {
    if (this.productQty < 20 && val === 'plus') {
      this.productQty += 1;
    }else if (this.productQty > 1 && val === 'min') {
      this.productQty -= 1;
    }
  }
}
