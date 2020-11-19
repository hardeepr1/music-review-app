import { Song } from './song';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SongService } from './song.service';
import { Injectable } from '@angular/core';
//very small resolver

@Injectable({
    providedIn: 'root'
})
export class SongListResolver implements Resolve<Song[]>{

    constructor(private songService: SongService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song[]> {
        return this.songService.getSongs();
    }
}