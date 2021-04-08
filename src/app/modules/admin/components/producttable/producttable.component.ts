import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/modules/menu/services/loader.service';
import { Product } from 'src/app/modules/products/models/product';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { AdminDataService } from '../../services/admindata.service';

@Component({
  selector: 'app-producttable',
  templateUrl: './producttable.component.html',
  styleUrls: ['./producttable.component.css']
})
export class ProducttableComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService, private router: Router, 
    private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  getProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id);
  }

  goRouteDynamic(id: string) {
    // this.router.navigateByUrl()
  }

  getColor(): string {
    if(this.loaderService.isDarkTheme) {
      return '#fff';
    } else {
      return '#000'
    }
  }

}
