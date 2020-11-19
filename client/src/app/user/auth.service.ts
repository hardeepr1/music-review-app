import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import {map, catchError} from 'rxjs/operators';


// todo: error handling for all the requests
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = "/api";
    
    //these two properties are used by others
    currentUserName: string;
    currentUser: User;
    redirectURL: string;
    
    // currentUserName = new BehaviorSubject<String>("");
    // currentUserName$ = this.currentUserName.asObservable();

    constructor(private http: HttpClient) {
    }

    login(userName: string, password: string): Observable<any> {
        //entire code to send username to backend and to retreive something
        const user : User = {
            userName: userName,
            password: password
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.baseUrl}/auth/signin`;
        return this.http.post<any>(url, user, { headers: headers });
    }

    register(user: User): Observable<any> {
        console.log(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.baseUrl}/auth/signUp`;
        return this.http.post<any>(url, user, { headers: headers }).pipe(
            catchError(error => {
                console.log("handling error locally")
                return of([])
            }
        ))
    }

    setSession(authResult): void{
        this.currentUserName = authResult.userName;
        localStorage.setItem('id_token', authResult.token);
    }

    logOut(): void{
        this.currentUserName = '';
        localStorage.removeItem("id_token");
    }

    isLoggedIn(): boolean{
        return localStorage.getItem('id_token') !== null
    }

    getToken():String {
        return localStorage.getItem('id_token');
    }

}