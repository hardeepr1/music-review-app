import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Song, SongResolved } from './song';
import { Observable, of } from 'rxjs';
import { SongService } from './song.service';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class SongResolver implements Resolve<SongResolved>{

    constructor(private songService: SongService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<SongResolved>{
        const id = route.paramMap.get('id');
        return this.songService.getSong(id).pipe(
            map(song =>  ({song:song})),
            catchError(this.handleError)
          );
    }

    handleError(error: HttpErrorResponse){
        console.log(`Retrieval error: ${error}`);
        return of({song: null, error : error});
    }
}