import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review';
import { tap, filter,map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ReviewService{
    private reviewsUrl = '/api/secure/review';

    constructor(private http: HttpClient){

    }

    get(): Observable<Review[]>{
        return this.http.get<Review[]>(this.reviewsUrl)
        .pipe(
            tap(data => console.log(JSON.stringify(data)))
        )
    }

    getReview(id : number): Observable<Review>{
        const url = `${this.reviewsUrl}/${id}`;
        return this.http.get<Review>(url)
        .pipe(
          tap(data => console.log('getReview: ' + JSON.stringify(data)))
        )
    }

    getReviewSong(songId : String):Observable<Review[]>{
        const url = `${this.reviewsUrl}/${songId}`;
        console.log(url);
        return this.http.get<Review[]>(url)
        .pipe(
            tap(data => console.log('getReviewSong: ' + JSON.stringify(data)))
        )
    }

    createReview(review): Observable<Review>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Review>(this.reviewsUrl, review, { headers: headers })
        .pipe(
            tap(() => console.log('createReview:' + review.id)),

        map(() => review),
      )
    }
}