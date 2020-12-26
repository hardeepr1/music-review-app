import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = "/api";
    
    //Properties are used by other components
    currentUserName: string;
    currentUser: User;
    redirectURL: string;
    
    constructor(private http: HttpClient) {
    }

    login(userName: string, password: string): Observable<any> {
        const user : User = {
            userName: userName,
            password: password
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.baseUrl}/auth/signin`;
        return this.http.post<any>(url, user, { headers: headers }).pipe(catchError(this.handleError));
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
        localStorage.setItem('userName', authResult.userName);
        localStorage.setItem('isAdmin', authResult.isAdmin);
    }

    logOut(): void{
        this.currentUserName = '';
        localStorage.removeItem("id_token");
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');
    }

    isLoggedIn(): boolean{
        return localStorage.getItem('id_token') !== null
    }

    getToken():String {
        return localStorage.getItem('id_token');
    }

    getUserName(): String{
        let userName = localStorage.getItem('userName');
        return userName;
    }

    //Method to handle errrors
    handleError(err: any): Observable<any>{
        return throwError(err);
    }
}