import { Inject, Injectable } from "@angular/core";

@Injectable()
export class windowProviderService{
    constructor(@Inject(Window) private window:Window){

    }
    getHostName(){
        return this.window.location.hostname;
    }
    getProtocol(){
        return this.window.location.protocol;
    }
    getPort(){
        return this.window.location.port;
    }

}
export const SERVICE_URI ={
    register : "/customer/register",
    login : "/customer/loginUser",
    changePassword:"/customer/forgotPassword",
    getProduct:"/product/all",
    addProduct:"/product/add",
    updateProduct:"/product/update",
    deleteProduct:"/product/delete",
    baseURL : "http://54.87.179.147:8090"
}