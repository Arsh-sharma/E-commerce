import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  ProductList: undefined | product[];
  deleteMessage: string | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.getProduct().subscribe((result) => {
      this.ProductList = result;
    });
  }

  deleteProduct(id: string) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = 'Product deleted sucessfully!';
      }
    });

    this.product.getProduct().subscribe((result) => {
      this.ProductList = result;
    });

    setTimeout(() => {
      this.deleteMessage = undefined;
    }, 3000);
  }
}
