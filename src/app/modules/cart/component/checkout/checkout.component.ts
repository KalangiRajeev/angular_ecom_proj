import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShippingAddress } from 'src/app/modules/auth/models/userprofile';
import { LoginService } from 'src/app/modules/auth/services/login.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderSent: boolean = false;
  submitted: boolean = false;
  isEditable: boolean = false;
  isAddressSaved: boolean = false;
  
  phoneNumberPattern: string = "^(\+\d{1,3}[- ]?)?\d{10}$";
  form: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  shippingAddress: ShippingAddress;

  constructor(public loginService: LoginService, 
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(8)]),
        houseNumber: new FormControl('', [Validators.required]),
        streetAddress: new FormControl('', [Validators.required]),
        landMark: new FormControl(),
        city: new FormControl('', [Validators.required]),
        pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.firstFormGroup.controls;
  }

  onSubmit(): void {
    console.log(this.firstFormGroup.valid);
    if(!this.loginService.currentUser){
        this.loginService.loginWithGoogle();
    } else if(this.firstFormGroup.valid){
      
      this.shippingAddress = Object.assign({}, 
        this.firstFormGroup.value
        );

      console.log(this.firstFormGroup.value);
      this.orderService.saveOrder(this.shippingAddress);
      
      if(this.isAddressSaved){
      this.loginService.saveAddressOfUser(this.shippingAddress);  
      }
      
      this.orderSent = true;
      this.submitted = true;
      
    } else {
      return;
    }    
  }

  saveAddressToOrder(): void {
    if (this.shippingAddress) {
      this.orderService.saveOrder(this.shippingAddress);
      this.orderSent = true;
      this.submitted = true;
    }
  }

  removeAddressOfUser(address: ShippingAddress): void {
    this.loginService.removeAddressOfUser(address);
  }
}
