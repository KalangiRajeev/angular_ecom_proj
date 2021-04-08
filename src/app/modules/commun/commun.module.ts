import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NgMaterialModule } from 'src/app/ng.material/ng.material.module';



@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CommonModule, 
    NgMaterialModule
  ],
  exports: [HomeComponent, AboutComponent]
})
export class CommunModule { }
