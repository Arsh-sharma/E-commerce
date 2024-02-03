import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router) {}

  menuType: String = "default";

  ngOnInit(): void {
      this.router.events.subscribe((val:any)=>{
        // console.log(val.url)

        if(val.url){
          console.log(val.url);
          if(localStorage.getItem('seller') && val.url.includes('seller')){
            console.log("in-seller-area");
            this.menuType = "seller"
          }else{
            console.log("out-seller-area")
          }
        }
      })
  }
}
