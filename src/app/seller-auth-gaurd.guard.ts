import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class sellerAuthGaurdGuard implements CanActivate {
  constructor(private sellerService: SellerService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean{

    if (localStorage.getItem('seller')) {
      return true;
    }

    return this.sellerService.isSelleraloggedIn;
  }
}
