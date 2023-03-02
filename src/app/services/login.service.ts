import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SERVICE_URI } from '../constants/web-api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
login1(data:any){
  let headers = new HttpHeaders({'Content-Type' : 'application/json'});
  this.http.post(SERVICE_URI.baseURL+SERVICE_URI.login,data,{headers :headers})
  .subscribe((response) => {
    console.log(response); // handle successful response here
  }, (error) => {
    console.log(error); // handle error here
  });

}
login(data:any){
  let headers = new HttpHeaders({'Content-Type' : 'application/json'});
  return this.http.post(SERVICE_URI.baseURL+SERVICE_URI.login,data,{headers : headers}).pipe(tap(result=>result));
}
register(data:any){
  let headers = new HttpHeaders({'Content-Type' : 'application/json'});
  return this.http.post(SERVICE_URI.baseURL+SERVICE_URI.register,data,{headers : headers}).pipe(tap(result=>result));
}
changePassword(data:any){
  let headers = new HttpHeaders({'Content-Type' : 'application/json'});
  return this.http.post(SERVICE_URI.baseURL+SERVICE_URI.changePassword,data,{headers : headers}).pipe(tap(result=>result));
}
}
