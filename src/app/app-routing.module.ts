import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  
  {path:'',redirectTo:'home',pathMatch:'full',},
  {path:'login/:type',component : LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'shopping',component:ProductComponent,canActivate:[AuthGuard]},
  {path:'addProduct',component:AddProductComponent,canActivate:[AuthGuard]},
  {path:'*',redirectTo:'home',pathMatch:'full',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
