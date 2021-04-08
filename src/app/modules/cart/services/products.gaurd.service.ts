import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ProductsComponent } from '../../products/components/products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsFirstGuard {
  private firstNavigation = true;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.firstNavigation) {
      this.firstNavigation = false;
      if(route.component != ProductsComponent) {
        this.router.navigateByUrl("/products");
        return false;
      }
    }
    return true;
  }
}
