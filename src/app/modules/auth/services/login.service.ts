import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Admin } from '../../admin/models/admin.model';

import { Order } from '../../cart/model/order';
import { ShippingAddress } from '../models/userprofile';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: any = null;
  adminUser: any = null;
  admin: Admin;
  orders: Order[];
  userAddresses: ShippingAddress[];

  constructor(private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase) {

      this.afAuth.authState.subscribe((userData) => {
        this.currentUser = userData;

        if (this.currentUser !== null) {

          // Verifying the current user as Admin
          this.afdb.object('/users/'+ this.currentUser.uid).valueChanges().subscribe(data => {
            this.admin = data as Admin;
            if (this.admin.isAdmin === true) {
              this.adminUser = this.currentUser;
            }
          });

          // fetching Orders of the logged In User
          this.afdb.list('/orders', ref => {
            return ref.orderByChild('uid').equalTo(this.currentUser.uid).limitToLast(100);
          }).valueChanges().subscribe(data => {
            this.orders = data as Order[];
            this.orders.reverse();
          });


          // Saving user information to the realtime database
          this.afdb.object('/users/' + this.currentUser.uid).update({
            displayName: this.currentUser.displayName,
            email: this.currentUser.email,
            uid: this.currentUser.uid,
            photoURL: this.currentUser.photoURL,
          })

          // fetching User Address Array
          this.afdb.list('/users/' + this.currentUser.uid + '/addresses/').valueChanges().subscribe(data => {
            this.userAddresses = data as ShippingAddress[];
            this.userAddresses.reverse();
          });

        }
      });
  }



  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then(() => {
        console.log("Success");
      }).catch(err => {
        console.log(err);
      });
  }

  saveAddressOfUser(shippingAddress: ShippingAddress) {
    let addressId = this.afdb.createPushId();
    shippingAddress.addressId = addressId;
    this.afdb.object('/users/' + this.currentUser.uid + '/addresses/' + addressId).update(shippingAddress);
  }

  removeAddressOfUser(address: ShippingAddress) {
    this.afdb.object('/users/' + this.currentUser.uid + '/addresses/' + address.addressId).remove();
  }

}
