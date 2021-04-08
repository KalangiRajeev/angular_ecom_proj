import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/auth/services/login.service';
import { LogoutService } from 'src/app/modules/auth/services/logout.service';
import { CartService } from 'src/app/modules/cart/services/cart.service';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  isCollapsed: boolean = true;
  isAdminCollapsed: boolean = true;

  constructor(public cartService: CartService, 
    public loginService: LoginService, 
    public logoutService: LogoutService ) { }

  ngOnInit(): void {
    
  }

}
