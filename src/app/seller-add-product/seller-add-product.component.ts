import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  constructor(private product: ProductService) {}

  addProductMessage: string | undefined;

  addProduct(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product Added Successfully';
      }
        setTimeout(() => {
          this.addProductMessage = undefined;
        }, 3000);

    });
    // console.log(data);
  }
}
