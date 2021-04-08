import { ShippingAddress} from "../../auth/models/userprofile";
import { CartLine } from "./cartline";

export interface Order {
    orderId: string;
    displayName: string;
    email: string;
    cart: CartLine[]; 
    cartPrice: number;
    isShipped: boolean;
    orderPlacedOn: number;
    orderShippedOn: number; 
    isPaymentCleared: boolean;
    photoURL: string;
    shippingAddress: ShippingAddress;
    uid: string;
}