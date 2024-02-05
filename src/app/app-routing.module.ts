import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerAuthGaurdGuard } from './seller-auth-gaurd.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerProductUpdateComponent } from './seller-product-update/seller-product-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [sellerAuthGaurdGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [sellerAuthGaurdGuard],
  },
  {
    path: 'seller-product-update/:id',
    component: SellerProductUpdateComponent,
    canActivate: [sellerAuthGaurdGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
