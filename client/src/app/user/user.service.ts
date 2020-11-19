import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(private http: HttpClient){

    }

    //method to return all users
    getAll(): any{

    }

    register(){
        
    }

}