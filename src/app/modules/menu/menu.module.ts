import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { NgMaterialModule } from 'src/app/ng.material/ng.material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CartService } from '../cart/services/cart.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// For MDB Angular Free
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [MenuTopComponent, ToolbarComponent],
  providers: [CartService],
  imports: [
    CommonModule,
    NgMaterialModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
  ],
  exports: [ToolbarComponent]
})
export class MenuModule { }
