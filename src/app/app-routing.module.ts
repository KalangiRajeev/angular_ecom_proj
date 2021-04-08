import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/components/admin/admin.component';
import { AdminGuardService } from './modules/admin/services/adminguard.service';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { LoginGuardService } from './modules/auth/services/login-guard.service';
import { CartDetailComponent } from './modules/cart/component/cartdetail/cartdetail.component';
import { CheckoutComponent } from './modules/cart/component/checkout/checkout.component';
import { ProductsFirstGuard } from './modules/cart/services/products.gaurd.service';
import { AboutComponent } from './modules/commun/components/about/about.component';
import { HomeComponent } from './modules/commun/components/home/home.component';
import { ProductsComponent } from './modules/products/components/products/products.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { animationState: 'home'} },
  { path: 'products', component: ProductsComponent, data: { animationState: 'one'} },
  { path: 'login', component: LoginComponent,canActivate: [LoginGuardService] , data: { animationState: 'login'} },
  { path: 'about', component: AboutComponent },
  { path: 'cartdetail', component: CartDetailComponent, canActivate: [ProductsFirstGuard], data: { animationState: 'two'} },
  { path: 'checkout', component: CheckoutComponent, canActivate: [ProductsFirstGuard], data: { animationState: 'three'} },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
