import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/modules/products/models/category';
import { Product } from 'src/app/modules/products/models/product';
import { ProductsService } from 'src/app/modules/products/services/products.service';

@Component({
  selector: 'app-producteditor',
  templateUrl: './producteditor.component.html',
  styleUrls: ['./producteditor.component.css']
})
export class ProducteditorComponent implements OnInit {

  editing: boolean = false;
  productSaved: boolean = false;
  categorySaved: boolean = false;
  submitted: boolean = false;
  product: Product = null;
  productform: FormGroup;
  categoryform: FormGroup;


  selectedFiles: FileList = null;


  constructor(private router: Router,
    public productsService: ProductsService,
    private activeRoute: ActivatedRoute,
    private afdb: AngularFireDatabase) {

    this.editing = activeRoute.snapshot.params["mode"] === "edit";
    if (this.editing) {
      this.product = this.router.getCurrentNavigation().extras.state.prod as Product;
    }

    this.productform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      units: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(),
      category: new FormControl('', [Validators.required]),
    });

    this.categoryform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

  }

  ngOnInit(): void {

    if (this.editing && this.product !== null) {
      this.productform.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        units: this.product.units,
        imageUrl: this.product.imageUrl,
        category: this.product.category,
      });
    }

  }

  get f() {
    return this.productform.controls;
  }

  get c() {
    return this.categoryform.controls;
  }

  saveForm(): void {

    console.log(this.productform.valid);
    if (this.productform.valid) {
      let updatedProduct = Object.assign({}, this.productform.value) as Product;
      
      if (this.product !== null) {
        updatedProduct.id = this.product.id
      } else {
        updatedProduct.id = this.afdb.createPushId();
      }

      this.productsService.saveProduct(updatedProduct);
      this.productSaved = true;
      this.submitted = true;
    } else {
      return;
    }
  }

  saveCategory(): void {
    console.log(this.categoryform.valid);
    if (this.categoryform.valid) {
      let newCategory = Object.assign({}, this.categoryform.value) as Category;

      if (newCategory !== null) {
        this.productsService.saveCategory(newCategory);
        this.categorySaved = true;
      }

    } else {
      return;
    }
  }

  detectFiles($event: any) {
    this.selectedFiles = $event.target.files;
  }

  uploadSingleImage() {
    let file = this.selectedFiles.item(0);
    this.productsService.uploadFile(file);
  }

}
