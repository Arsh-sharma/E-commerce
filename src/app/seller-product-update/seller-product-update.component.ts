import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-product-update',
  templateUrl: './seller-product-update.component.html',
  styleUrl: './seller-product-update.component.css',
})
export class SellerProductUpdateComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;

  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.product.updateProduct(productId).subscribe((result) => {
      // console.log(result);
      this.productData = result;
    });
    // console.log(productId);
  }

  updateProduct(data: product) {

    if (this.productData){
      data.id = this.productData.id
          this.product.updateProductFinal(data).subscribe((result) => {
            this.productMessage = 'Product has been updated';
          });
    }
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
