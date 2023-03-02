import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {ProductService} from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_MESSAGES } from '../constants/messages';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  errorMessage="";
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER ] as const;
  productForm= new FormGroup({
    name : new FormControl('',{validators:[Validators.required]}),
    description : new FormControl('',{validators:[Validators.required]}),
    price : new FormControl('',{validators:[Validators.required]}),
    quantity : new FormControl('',{validators:[Validators.required]}),
    status : new FormControl('',{validators:[Validators.required]})
  })
  features:string[]=[];

  constructor(private productService:ProductService,private snackBar:MatSnackBar,
    private storeService:StoreService) { }


  ngOnInit(): void {
    if(this.storeService.editProduct && this.storeService.userData.admin){
      this.productForm.reset(this.storeService.editingProduct);
      this.features=this.storeService.editingProduct.features;
    }
  }
  get editProduct(){
    return this.storeService.editProduct;
  }
  addProduct(){
    if(this.storeService.editProduct){
        this.updateProduct();
    }
    else{
      let product:any=this.productForm.value;
    product['features']=this.features;
    this.productService.addProducts(product).subscribe((res:any)=>{
      this.errorMessage="";
      this.snackBar.open(APP_MESSAGES.addProduct,"close",{duration:5000});


    },e=>{
      this.errorMessage=e.error;
    })
    }
    

  }
  updateProduct(){
    let product:any=this.productForm.value;
    product['features']=this.features;
    this.productService.updateProducts(product,this.storeService.editingProduct.name).subscribe((res:any)=>{
      this.errorMessage="";
      this.snackBar.open(APP_MESSAGES.updateProduct,"close",{duration:5000});


    },e=>{
      this.errorMessage=e.error;
    })

  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.features.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(feature: string): void {
    const index = this.features.indexOf(feature);

    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }

}
