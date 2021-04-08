export interface UserProfile {
    displayName: string;
    photoURL: string;
    email: string;
    uid: string;
    shippingAddress: ShippingAddress[];
}

export interface ShippingAddress{
    addressId: string;
    name: string;
    houseNumber: string;
    streetAddress: string;
    landMark: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
    phone: number;
}