import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../auth/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router,
    private loginService: LoginService) {}


  canActivate(router: Router, state: RouterStateSnapshot): boolean {
    if (this.loginService.admin.isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl("/products");
      return false;
    }
  }

}
