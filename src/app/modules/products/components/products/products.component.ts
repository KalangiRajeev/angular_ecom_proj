import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterContentInit {

  selectedCategory: string = null;

  selectedPage: number = 1;
  quantity: number = 1;
  showFiller: boolean = false;

  searchForm: FormGroup;
  searchString: string = '';

  pageSize: number = 8;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [4, 8, 16, 24];

  // mat paginator output.
  pageEvent: PageEvent = null;

  constructor(public productsService: ProductsService, public cartService: CartService) {
    this.searchForm = new FormGroup({
      search: new FormControl(),
    });
  }

  get s() {
    return this.searchForm.controls;
  }

  searchProducts(): void {
    this.searchString = this.searchForm.value.search as string;
  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
  }

  get products(): Product[] {
    if (this.pageEvent) {
      this.pageIndex = this.pageEvent.pageIndex * this.pageSize;
      this.pageSize = this.pageEvent.pageSize;
    }
    return this.productsService.getAllProducts(this.selectedCategory, this.searchString)
      .slice(this.pageIndex, this.pageIndex + this.pageSize);

  }

  get categories(): Category[] {
    return this.productsService.getAllCategories();
  }

  setSelectedCategory(category: string = null): void {
    this.selectedCategory = category;
    this.searchString = '';
  }

  addProductToCart(product: Product, quantity: number): void {
    this.cartService.addLine(product, quantity);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
