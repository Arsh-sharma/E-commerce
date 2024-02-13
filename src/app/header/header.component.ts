import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private product: ProductService) {}

  menuType: String = 'default';
  sellerName: String = 'seller';
  searchResults: undefined | product[];
  userName: string = '';
  cartQty: number = 0;

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      // console.log(val.url)

      if (val.url) {
        // console.log(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('in-seller-area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            // console.log(sellerStore);
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
          // console.log('out-seller-area');
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartQty = JSON.parse(cartData).length;
    }

    this.product.cartDataQty.subscribe((items) => {
      this.cartQty = items.length;
    });
  }

  onLogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['./']);
  }

  onSearch(data: KeyboardEvent) {
    if (data) {
      // console.log(data)
      const element = data.target as HTMLInputElement;

      // console.log(element.value);

      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResults = result;
        // console.log(result);
      });

      // console.warn(element.value)
    }
  }

  hideSearch() {
    this.searchResults = undefined;
  }

  submitSearch(data: string) {
    this.router.navigate([`search/${data}`]);
  }

  redirectToDetails(id: number) {
    this.router.navigate([`/details/${id}`]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }
}
