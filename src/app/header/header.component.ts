import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  menuType: String = 'default';
  sellerName: String = 'seller';

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
        } else {
          this.menuType = 'default';
          // console.log('out-seller-area');
        }
      }
    });
  }

  onLogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['./']);
  }
}
