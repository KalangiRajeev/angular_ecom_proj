import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  @Input() product: Product;
  @Output() outputEvent = new EventEmitter<number>();

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  setQuantity(value: number) {
    this.outputEvent.emit(Number(value));
  }

}
