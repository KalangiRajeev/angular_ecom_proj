import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { LoaderService } from 'src/app/modules/menu/services/loader.service';
import { CartLine } from '../../model/cartline';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.component.html',
  styleUrls: ['./cartdetail.component.css']
})
export class CartDetailComponent implements OnInit {



  displayedColumns: string[] = ['product', 'quantity', 'price', 'subtotal', 'action'];

  constructor(public cartService: CartService,
    public loaderService: LoaderService) { }

  ngOnInit(): void {
    
  }

  getColor(): string {
    if (this.loaderService.isDarkTheme){
      return '#fff';
    } else {
      return '#000';
    }
  }

}
