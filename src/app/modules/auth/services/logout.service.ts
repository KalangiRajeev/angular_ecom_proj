import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private afAuth: AngularFireAuth) { }

  logout(): void {
    this.afAuth.signOut().then(onfulfilled => {
      console.log(onfulfilled);
    }).catch(onrejected => {
      console.log(onrejected);
    });
  }
}
