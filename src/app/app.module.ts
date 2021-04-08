import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth'; 
import { environment } from 'src/environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { CommunModule } from './modules/commun/commun.module';
import { MenuModule } from './modules/menu/menu.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './modules/admin/admin.module';
import { NgxPopper } from 'angular-popper';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AuthModule,
    CommunModule,
    MenuModule,
    ProductsModule,
    CartModule,
    NgbModule, 
    AdminModule, 
    NgxPopper,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
