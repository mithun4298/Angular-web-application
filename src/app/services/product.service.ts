import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SERVICE_URI } from '../constants/web-api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getProducts(){
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
   return this.http.get(SERVICE_URI.baseURL+SERVICE_URI.getProduct,{headers : headers}).pipe(tap((result: any)=>result));
 // return this.http.get<any>("http://localhost:3000/productList/");
  }
  addProducts(product:any){
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post(SERVICE_URI.baseURL+SERVICE_URI.addProduct,product,{headers : headers}).pipe(tap((result: any)=>result));
  // return this.http.post<any>("http://localhost:3000/productList/",product);
  }
  updateProducts(product:any,name:string){
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post(SERVICE_URI.baseURL+SERVICE_URI.updateProduct+"/"+name,product,{headers : headers}).pipe(tap((result: any)=>result));
   // return this.http.put<any>("http://localhost:3000/productList/"+name,product);
  }
  deleteProducts(name:string){
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.delete(SERVICE_URI.baseURL+SERVICE_URI.deleteProduct+"/"+name,{headers : headers}).pipe(tap((result: any)=>result));
   // return this.http.delete<any>("http://localhost:3000/productList/");
  }
}
