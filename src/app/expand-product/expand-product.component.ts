import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { APP_MESSAGES } from '../constants/messages';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ProductService } from '../services/product.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-expand-product',
  templateUrl: './expand-product.component.html',
  styleUrls: ['./expand-product.component.css']
})
export class ExpandProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private storeService:StoreService,
  private router:Router,
  private snackBar:MatSnackBar,
  private dialog:MatDialog,
  private productService:ProductService,
  private dialogRef:MatDialogRef<ExpandProductComponent>) { }

  ngOnInit(): void {
  //  console.log(this.storeService.userData.admin);
  }
  addToCart(product:any){
    if(this.storeService.loggedIn){
      if(product.status == "OUT OF STOCK"){
        this.snackBar.open(APP_MESSAGES.outOfStock,'close',{duration:5000});
        
      }
      else{
        this.storeService.cart.push(product);
        this.snackBar.open(APP_MESSAGES.addToCart,'close',{duration:5000});
      }
      

    }
    else{
      const snackRef=this.snackBar.open(APP_MESSAGES.signIn,'sign in',{duration:5000});
      snackRef.onAction().subscribe(()=>{
        this.router.navigate(["/login/SignIn"])
        this.dialogRef.close();
      })

    }

  }
  get isAdmin(){
   // console.log(this.storeService.userData.admin);
    return this.storeService.userData.admin;
  }
  editProduct(product:any){
    this.storeService.editProduct=true;
    this.storeService.editingProduct=product;
    this.router.navigate(["/addProduct"]);
    this.dialogRef.close();

  }
  deleteProduct(product:any){
    const dialogRef=this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.productService.deleteProducts(product.name).subscribe((result:any)=>{
          this.dialogRef.close({event:"delete",data:result});
        },e=>{
          this.snackBar.open(APP_MESSAGES.errorDeleteProduct,'close',{duration:5000});

        })

      }
      
    })

  }
  closeDialog(){
    this.dialogRef.close();
  }

}
