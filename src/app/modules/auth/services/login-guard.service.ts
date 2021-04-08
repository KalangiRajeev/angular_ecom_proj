import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private router: Router, 
    private loginService: LoginService) { }

    canActivate(router: Router, state: RouterStateSnapshot): boolean {
      if(this.loginService.currentUser) {
        return true;
      } else {
        this.router.navigateByUrl("/products");
        return false;
      }
    }
}
