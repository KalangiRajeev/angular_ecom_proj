import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShippingAddress } from '../../auth/models/userprofile';
import { LoginService } from '../../auth/services/login.service';
import { CartLine } from '../model/cartline';
import { Order } from '../model/order';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = null;
  loaded: boolean = false;

  constructor(private afdb: AngularFireDatabase,
    private loginService: LoginService,
    private cartService: CartService) { 
      
    }

  saveOrder(selectedAddress: ShippingAddress) {

    let id: string = this.afdb.createPushId();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = month + ' '+ day  + ', ' + year;

    var orderUpdate = {};
    
    orderUpdate[id] = { 
      orderId: id,
      timeStamp: Date.now(),
      orderPlacedOn: output,
      displayName: this.loginService.currentUser.displayName, 
      photoURL: this.loginService.currentUser.photoURL, 
      email: this.loginService.currentUser.email, 
      uid: this.loginService.currentUser.uid,
      shippingAddress: selectedAddress as ShippingAddress,
      cart: this.cartService.cartLines as CartLine[],
      isShipped: false as boolean,
      shippedOn: null as Date,
      isPaymentCleared: false as boolean,
      cartPrice: this.cartService.cartPrice as number,
    };

    // selectedAddress as ShippingAddress;

    this.afdb.object('orders').update(orderUpdate);
    this.cartService.clear();
  }

  getOrders(): Order[]{
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.orders;
  }

  loadOrders(): void {
    this.afdb.list('orders', ref => {
      return ref.orderByKey().limitToLast(500);
    }).valueChanges().subscribe(data => {
      this.orders = data as Order[];
      this.orders.reverse();
      this.loaded = true;
    })
  }

  
  deleteCartLine(order: Order, productId: string): void {

    this.orders.filter(o => o.orderId === order.orderId).map(o => {
      this.cartService.clear();
      this.cartService.cartLines = o.cart;
      this.cartService.removeLine(productId);  
    });


    var orderUpdate = {};

    orderUpdate[order.orderId] = { 
      orderId: order.orderId,
      displayName: order.displayName, 
      email: order.email,
      cart: this.cartService.cartLines,
      cartPrice: this.cartService.cartPrice,
      isShipped: order.isShipped,
      orderPlacedOn: Date.now(),
      orderShippedOn: null as Date,
      isPaymentCleared: false as boolean,
      photoURL: order.photoURL, 
      shippingAddress: order.shippingAddress,
      uid: order.uid,
    }

    this.afdb.object('orders').update(orderUpdate);
    this.cartService.clear();

  } 

  updateOrder(order: Order): void {
    this.afdb.object('/orders/' + order.orderId).update(order);
  }

  deleteOrder(orderId: string): void {
    this.afdb.object('/orders/' + orderId).remove();
  }
}
