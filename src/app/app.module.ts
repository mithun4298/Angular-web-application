import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';

import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


import {MatCardModule} from '@angular/material/card';

import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
//import {NgxMatRangeSliderModule} from 'ngx-mat-range-slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

import {MatBadgeModule} from '@angular/material/badge';
import { ExpandProductComponent } from './expand-product/expand-product.component';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    DeleteDialogComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    ExpandProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
   // NgxMatRangeSliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatSliderModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatBadgeModule
  ],
  providers: [{
    provide :HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi :true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
