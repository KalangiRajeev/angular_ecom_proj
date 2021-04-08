import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailComponent } from './component/cartdetail/cartdetail.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { LoginService } from '../auth/services/login.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from 'src/app/ng.material/ng.material.module';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@NgModule({
  declarations: [CartDetailComponent, CheckoutComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule
  ],
  providers: [CartService, OrderService, LoginService, FormBuilder, 
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
})
export class CartModule { }
