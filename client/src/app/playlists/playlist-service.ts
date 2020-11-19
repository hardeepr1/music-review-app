import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayList } from './playlist';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PlayListService{
    private playListUrl = '/api/secure/playlist';

    constructor(private http: HttpClient){}

    //this is for time being need to be changed may be
    createPlayList(playList: PlayList): Observable<PlayList>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<PlayList>(this.playListUrl, playList, { headers: headers })
    }

    //we will do error handling and all such things 
    getPlayList(id): Observable<PlayList>{
        const url = `${this.playListUrl}/${id}`;
        return this.http.get<PlayList>(url).pipe(
            tap(data => console.log(JSON.stringify(data)))
        )
    }

    getPlayLists(): Observable<PlayList[]>{
        return this.http.get<PlayList[]>(this.playListUrl)
        .pipe(
            tap(data => console.log(JSON.stringify(data)))
        )
    }
}