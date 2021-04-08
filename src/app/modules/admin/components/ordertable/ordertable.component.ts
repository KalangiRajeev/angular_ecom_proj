import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/modules/cart/model/order';
import { OrderService } from 'src/app/modules/cart/services/order.service';
import { LoaderService } from 'src/app/modules/menu/services/loader.service';

@Component({
  selector: 'app-ordertable',
  templateUrl: './ordertable.component.html',
  styleUrls: ['./ordertable.component.css']
})
export class OrdertableComponent implements OnInit {

  isShipped = false;
  orders: Order[] = null;

  constructor(private orderService: OrderService, private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  getOrders(): Order[] {
    return this.orderService.getOrders().filter(order =>
      order.isShipped === this.isShipped
    );
  }

  markShipped(order: Order): void {

    order.isShipped = true;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = month + ' ' + day + ', ' + year;

    order.orderShippedOn = Number(new Date());

    this.orderService.updateOrder(order);
  }

  markPaid(order: Order): void {
    order.isPaymentCleared = true;
    this.orderService.updateOrder(order);
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id);
  }

  deleteCartLine(order: Order, productId: string) {
    console.log(order);
    console.log(productId);
    this.orderService.deleteCartLine(order, productId);
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme){
      return '#fff';
    } else {
      return '#000';
    }
  }

}
