import { Resolver } from 'dns';
import { PlayList } from './playlist';
import { RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayListService } from './playlist-service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PlayListResolver implements Resolve<PlayList>{
    
    constructor(private playListService: PlayListService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PlayList>{
        const id = route.paramMap.get('id');
        return this.playListService.getPlayList(id);
    }
}