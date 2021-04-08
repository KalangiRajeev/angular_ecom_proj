import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Product } from '../../products/models/product';
import { CartLine } from '../model/cartline';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartLines: CartLine[] = [];
  itemCount: number = 0;
  cartPrice: number = 0;
    
  constructor() { 
  }

  public recalculate(): void {
    this.itemCount = 0;
    this.cartPrice = 0;
    
    this.cartLines.forEach(line => {
      this.itemCount += Number(line.quantity);
      this.cartPrice += Number(line.quantity) * line.product.price;  
    });
  }

  addLine(product: Product, quantity: number = 1): void {
    let line = this.cartLines.find(line => line.product.id === product.id);
    if (line !== undefined) {
      line.quantity += quantity;
    } else {
      this.cartLines.push(new CartLine(product, quantity));
    }
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number): void {
    let line = this.cartLines.find(line => line.product.id === product.id);
    if (line !== undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  removeLine(id: string): void {
    let index = this.cartLines.findIndex(line => line.product.id === id);
    this.cartLines.splice(index, 1);
    this.recalculate();
  }

  clear(): void {
    this.cartLines = [];
    this.itemCount = 0; 
    this.cartPrice = 0;
  }
}
