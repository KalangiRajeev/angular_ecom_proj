import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from 'src/app/ng.material/ng.material.module';
import { AdminComponent } from './components/admin/admin.component';
import { LoginService } from '../auth/services/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { ProducttableComponent } from './components/producttable/producttable.component';
import { ProducteditorComponent } from './components/producteditor/producteditor.component';
import { OrdertableComponent } from './components/ordertable/ordertable.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './services/adminguard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const childRoutes: Routes = [
  { path: 'admin/productspage/:mode', component: ProducteditorComponent, canActivate: [AdminGuardService] },
  { path: 'productspage', component: ProducttableComponent, canActivate: [AdminGuardService], data: { animationState: 'productspage'}},
  { path: 'orders', component: OrdertableComponent, canActivate: [AdminGuardService], data: { animationState: 'orders'}},
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [AdminComponent, ProducttableComponent, ProducteditorComponent, OrdertableComponent],
  imports: [
    RouterModule.forChild(childRoutes),
    CommonModule,
    NgMaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AngularFireDatabase, LoginService],
})
export class AdminModule { }
