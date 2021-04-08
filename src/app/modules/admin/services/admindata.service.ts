import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Order } from '../../cart/model/order';
import { Category } from '../../products/models/category';
import { Product } from '../../products/models/product';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  product: Product = null;
  categories: Category[] = null;

  constructor(private afdb: AngularFireDatabase) { }


  getCategories(): Category[] {
    this.afdb.list('categories').valueChanges().subscribe(data => {
      this.categories = data as Category[]; 
    });
    return this.categories;
  }

  updateCategory(category: Category) {
    this.afdb.object('/categories/' + category.id).update(category);
  }

  getProduct(id: string): Product {
    this.afdb.object('/products/' + id).valueChanges().subscribe(data => {
      this.product = data as Product;
    });
    return this.product;
  }

  getProducts(): Observable<Product[]> {
    return this.afdb.list('/products').valueChanges() as Observable<Product[]>;
  }

  saveProduct(product: Product) {
    
  }

  deleteProduct(id: string) {
    this.afdb.object('/products/' + id).remove();
  }

  saveOrder(order: Order) {
    this.afdb.object('/orders/' + order.orderId).update(order);
  }

  getOrders(): Observable<Order[]> {
    return this.afdb.list('/orders').valueChanges() as Observable<Order[]>;
  }

  deleteOrder(id: string) {
    this.afdb.object('/orders/' + id).remove();
  }

  updateOrder(order: Order) {
    return this.afdb.object('/orders/' + order.orderId).update(order);
  }
}
