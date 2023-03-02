import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { StoreService } from '../services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_MESSAGES } from '../constants/messages';
import { ExpandProductComponent } from '../expand-product/expand-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchText = '';
  minFilter = 0;
  left = "0"
  right = "0";
  maxFilter = 10000;

  constructor(private productService: ProductService,
    private storeService:StoreService,
    private router:Router,
    private dialog:MatDialog,
    private snackBar:MatSnackBar) { }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  getactualPrice(value: number) {
    return value / 2;
  }
  
  priceFilter(type: string, slider: any) {
    if (type == 'min') {
      if (this.maxFilter - slider.value < 1000) {
        slider.value = this.maxFilter - 1000;
        this.minFilter = this.maxFilter - 1000;
      }
      else {
        this.minFilter = slider.value;
      }
      this.left = (this.minFilter / 10000) * 100 + "%";
      console.log(this.left);
      console.log(this.minFilter);
      console.log(slider.value);
    }
    if (type == 'max') {
      if (slider.value - this.minFilter < 1000) {
        slider.value = parseInt(this.minFilter.toString()) + 1000;
        this.maxFilter = parseInt(this.minFilter.toString()) + 1000;
      }
      else {
        this.maxFilter = slider.value;
      }
      this.right = 100 - (this.maxFilter / 10000) * 100 + "%";

    }

    this.filterProducts();


  }
  editProduct(product:any){
    this.storeService.editProduct=true;
    this.storeService.editingProduct=product;
    this.router.navigate(["/addProduct"]);

  }
  deleteProduct(product:any){
    const dialogRef=this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
       // this.productService.deleteProducts(product.name).subscribe{(res)}
        this.productService.deleteProducts(product.name).subscribe((result:any)=>{
          if (result) {
            this.products = result;
            this.filteredProducts = result;
          }
          this.snackBar.open(APP_MESSAGES.deleteProduct,'close',{duration:5000});
          

        },e=>{
          this.snackBar.open(APP_MESSAGES.errorDeleteProduct,'close',{duration:5000});

        })

      }
      
    })

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
      })

    }

  }
  get isAdmin(){
    return this.storeService.userData.admin;
  // console.log(this.storeService.userData);
  // return false;
  }
  expandProduct(product:any){
    const dialogRef=this.dialog.open(ExpandProductComponent,{data:product,height:"500px",width:"100%"});
    dialogRef.afterClosed().subscribe(result=>{
      if(result && result.event=="delete"){
        this.products = result.data;
        this.filteredProducts = result.data;
        this.snackBar.open(APP_MESSAGES.deleteProduct,'close',{duration:5000});


      }
    })
  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.products = result;
        this.filteredProducts = result;
      }
    }, err => {
      console.log(err);
    })
  }
  filterProducts() {
    if (this.searchText) {
      this.filteredProducts = [];
      let otherProducts = [];
      let descriptiveProducts = [];
      let featuredProducts = [];
      for (let product of this.products) {
        if (product.name?.toLowerCase().indexOf(this.searchText.toLowerCase()) == 0) {
          this.filteredProducts.push(product);
        }
        else if (product.name?.toLowerCase().indexOf(this.searchText.toLowerCase()) > 0) {
          otherProducts.push(product);
        }
        else if (product.description?.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) {
          descriptiveProducts.push(product);
        }
        else {
          for (let feature of product.features) {
            if (feature.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) {
              featuredProducts.push(product);
              break;
            }
          }
        }

      }
      this.filteredProducts.push(...otherProducts, ...descriptiveProducts, ...featuredProducts);
      








    }
    else {
      this.filteredProducts = this.products;
    }
    this.filteredProducts= this.filteredProducts.filter(product=>{
      if(product.price>= this.minFilter && product.price <= this.maxFilter){
        return true;
      }
      return false;
    })

  }

}
