import { Product } from "../../products/models/product";

export class CartLine {
    constructor(public product: Product, 
        public quantity: number) { }

    get lineTotal() {
        return this.quantity * this.product.price;
    }
}