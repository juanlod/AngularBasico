import { CommonModule } from '@angular/common';
// import { AddfraComponent } from './facturas/addfra/addfra.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
// tslint:disable-next-line: deprecation
    HttpModule

  ],
  declarations: [],
  providers: []
})
export class FacturasModule { }
