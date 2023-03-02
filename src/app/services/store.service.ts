import { Injectable } from '@angular/core';
//import { userModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  loggedIn=false;
  userData:any={};
  editProduct=false;
  editingProduct:any={};
  cart:any[]=[];
  token:string="";

  constructor() { }
}
