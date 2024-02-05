import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
 
  ProductList: undefined | product[];
  deleteMessage: string | undefined;
  deleteIcon = faTrash;
  editIcon = faEdit;

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
