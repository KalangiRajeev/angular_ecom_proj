import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { NgMaterialModule } from 'src/app/ng.material/ng.material.module';
import { AngularFireDatabase } from '@angular/fire/database';
import { CartService } from '../cart/services/cart.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdminDataService } from '../admin/services/admindata.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { CardComponent } from './components/products/card/card.component';

@NgModule({
  declarations: [ProductsComponent, CardComponent],
  imports: [
    CommonModule, 
    NgMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [AngularFireDatabase, CartService, AdminDataService]
})
export class ProductsModule {  }
