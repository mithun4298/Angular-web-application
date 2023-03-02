import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

export function  confirmPasswordValidator() {
  return (fb:AbstractControl)=>{
    const password = fb.get('password')?.value;
    const confirmPassword =fb.get('confirmPassword')?.value;
    if(!confirmPassword){
      return null;
    }
    if(password !== confirmPassword){
      fb.get("confirmPassword")?.setErrors({message : "passwords didn't match"});
    }
    return null;
  }
  
  
  
    
}

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value:string = control.value;

      if (!value) {
          return null;
      }
      if(/\s/.test(value)){
        return {message:"password should not contain any white spaces"};
      }
      console.log(!/[A-Z]+/.test(value))
      if(! /[A-Z]+/.test(value)){
        return {message:"password should contain atleast one capital case letter"};
      }
      if(! /[a-z]+/.test(value)){
        return {message:"password should contain atleast one lower case letter"};
      }
      if( !/[0-9]+/.test(value)){
        return {message:"password should contain atleast one number"};
      }
      if(!/[~!@#$%^&*()_+]+/.test(value)){
        return {message:"password should contain atleast one special character"};
      }
      if(value.length<8){
        return {message:"password should be atleast 8 characters long"};
      }

      return null;
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('registerFormDirective', { static: true })
  private registerFormDirective!: FormGroupDirective;
  signIn = true;
  errorMessage="";
  changePassword=false;
  loginForm = new FormGroup({
    email : new FormControl('',{updateOn:'change',validators:[Validators.required,Validators.email]}),
    password : new FormControl('',{updateOn:'change',validators:[Validators.required]})
  })

  registerForm= new FormGroup({
    email : new FormControl('',{validators:[Validators.required,Validators.email]}),
    password : new FormControl('',{updateOn:'change',validators:[Validators.required,createPasswordStrengthValidator()]}),
    confirmPassword : new FormControl('',{updateOn:'change',validators:[Validators.required]}),
    firstName : new FormControl('',{updateOn:'change',validators:[Validators.required]}),
    lastName : new FormControl('',{updateOn:'change',validators:[Validators.required]}),
    loginId : new FormControl('',{updateOn:'change',validators:[Validators.required]}),
    phoneNumber : new FormControl('',{updateOn:'change',validators:[Validators.required,Validators.pattern("^[0-9]{10}$")]})
  },{validators:confirmPasswordValidator()})

  forgotForm= new FormGroup({
    email : new FormControl('',{validators:[Validators.required,Validators.email]}),
    password : new FormControl('',{updateOn:'change',validators:[Validators.required,createPasswordStrengthValidator()]}),
    confirmPassword : new FormControl('',{updateOn:'change',validators:[Validators.required]})
  },{validators:confirmPasswordValidator()})

  
  
  constructor(private loginService : LoginService,
    private activatedRoute:ActivatedRoute,
    private store:StoreService,
    private router:Router) {
    
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if(params.get("type") == "SignUp"){
        this.signIn = false;

      }
      else{
          this.signIn = true;
      }
    })
  }

  login1(){
    this.loginService.login1(this.loginForm.value);
    console.log("hii");
    this.router.navigate(["/home"]);
  }
  login(){
    this.loginService.login(this.loginForm.value).subscribe((user:any)=>{
      this.errorMessage="";
      this.store.loggedIn = true;
      this.store.userData = user.customer;
      console.log(user);
      console.log(this.store.userData);
      // console.log(this.store.userData.firstName);
       console.log(user.user);
      // console.log(user.user.email);
      console.log(user.token);
      console.log(user.customer.token);
      this.store.token = user.token;
      localStorage.setItem("id_token",user.token);
     const a= localStorage.getItem("id_token")
     console.log(a);
      this.router.navigate(["/home"]);

    },err=>{
      console.log(err);
      this.errorMessage = err.error;
    })

  }
  register(){
    this.loginService.register(this.registerForm.value).subscribe(user=>{
      this.errorMessage="";
      console.log(user);
      alert("user added  susscessfully");
      //this.registerFormDirective.resetForm();
      this.router.navigate(["/login/SignUp"]);
      console.log(user);

    },err=>{
      console.log(err);
      this.errorMessage = err.error;
    })

  }
  forgotPassword(){
    this.loginService.changePassword(this.forgotForm.value).subscribe(user=>{
      this.errorMessage="";
      console.log(user);

    },err=>{
      console.log(err);
      this.errorMessage = err.error;
    })
  }

}
