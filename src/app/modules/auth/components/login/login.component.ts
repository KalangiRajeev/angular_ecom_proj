import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Order } from 'src/app/modules/cart/model/order';
import { OrderService } from 'src/app/modules/cart/services/order.service';
import { LoaderService } from 'src/app/modules/menu/services/loader.service';
import { LoginService } from '../../services/login.service';
import { LogoutService } from '../../services/logout.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  selectedPage: number = 1;
  
  pageSize: number = 4;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [2, 4, 8, 16];
  pageEvent: PageEvent;
  
  
  displayedColumns: string[] = ['product', 'quantity', 'price', 'subtotal'];
  


  constructor(public loginService: LoginService,
    public logoutService: LogoutService,
    public orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.loginWithGoogle();
  }

  logout(): void {
    this.logoutService.logout();
  }

  get orders(): Order[] {
    if(this.pageEvent){
      this.pageSize = this.pageEvent.pageSize;
      this.pageIndex = this.pageEvent.pageIndex * this.pageSize;
    }
    return this.loginService.orders.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }

  changePage(newPage: number): void {
    this.selectedPage = newPage;
  }
}
