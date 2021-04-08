import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { AdminDataService } from '../../admin/services/admindata.service';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];
  categories: Category[] = [];
  
  
  downloadURL: string = null;

  constructor(private afdb: AngularFireDatabase, private adminDataService: AdminDataService) {
    
    this.afdb.list('products').valueChanges().subscribe(data => {
      this.products = data as Product[];
    });

    this.afdb.list('categories').valueChanges().subscribe(data => {
      this.categories = data as Category[];
    });
  }

  getAllProducts(selectedCategory: string = null, searchString: string = ''): Product[] {
    return this.products.filter(
      (product) => (selectedCategory === null || selectedCategory === product.category) && 
    product.name.toLowerCase().includes(searchString.toLowerCase()));
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  saveProduct(product: Product) {

    if(this.downloadURL !== null) {
      product.imageUrl = this.downloadURL;
      this.downloadURL = null;
    }
      console.log(product);
      this.afdb.object('/products/' + product.id).update(product);
  }

  deleteProduct(productId: string) {
    this.afdb.object('/products/' + productId).remove();
  }

  uploadFile(file: File) {
    const storageRef = firebase.storage().ref().child('/images/'+ file.name);
    const uploadTask = storageRef.put(file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot) => {
          console.log(snapshot);
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
          storageRef.getDownloadURL().then((url) => {
            this.downloadURL = url as string;
            console.log(this.downloadURL)
          });
        } 
      );
  }

  saveCategory(category: Category) {
    category.id = this.afdb.createPushId();
    this.afdb.object('/categories/' + category.id).update(category);
  }

}
