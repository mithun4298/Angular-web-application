import { Component } from '@angular/core';
import { StoreService } from './services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_MESSAGES } from './constants/messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopapp';
  
  constructor(public store:StoreService,
    private snackBar:MatSnackBar,
    private router: Router
    ){

  }
  logOut(){
    this.store.userData={};
    localStorage.removeItem("id_token");
    this.store.loggedIn=false;
    this.snackBar.open(APP_MESSAGES.logOut,"close",{duration:5000});
    this.store.cart.length=0;
    this.router.navigate(['/home']);


  }
  get cartQuantity(){
      return this.store.cart.length;
  }
}
