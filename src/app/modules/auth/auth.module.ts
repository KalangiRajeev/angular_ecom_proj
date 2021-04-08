import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { NgMaterialModule } from 'src/app/ng.material/ng.material.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginService } from './services/login.service';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgMaterialModule, 
    AngularFireAuthModule, 
    NgMaterialModule
  ],
  providers: [LoginService],
    
})
export class AuthModule { }
