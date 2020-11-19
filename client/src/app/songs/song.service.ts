import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { Song } from './song';



@Injectable({
  providedIn: 'root'
})
export class SongService {
  private openPrefix = '/api/open/'
  private songUrl = '/api/open/songs';
  private securePrefix = '/api/secure';

  constructor(private http: HttpClient) {

  }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songUrl).pipe(
      tap(data => console.log(JSON.stringify(data)))
    )
  }

  getSong(id: String): Observable< Song> {
    if (id == "0") {
      return of(this.initializeSong());
    }
    const url = `${this.securePrefix}/song/${id}`;
    return this.http.get<Song>(url)
      .pipe(
      )
  }

  handleError(error){
    console.log("Error has occured");
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  updateSong(song: Song): Observable<Song> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.songUrl}/${song.id}`;
    return this.http.put<Song>(url, song, { headers: headers })
      .pipe(
        tap(() => console.log('updateSong:' + song.id)),

        map(() => song),
      )
  }


  deleteSong(id: string): Observable<Song> {
    //Todo: handle condition when id is equal to zero
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.songUrl}/${id}`;
    return this.http.delete<Song>(url, {headers})
      .pipe(
        tap(data => console.log('deleteProduct' + id))
      )
  }

  private initializeSong(): Song {
    return {
      id: "0",
      songTitle: null,
      artist: null,
      album: null,
      year: null,
      genre: null,
      comment: null
    }
  }
}