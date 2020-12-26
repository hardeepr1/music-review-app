import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsListComponent } from './songs-list.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import { SongComponent } from './song.component';
import { SongResolver } from './song-resolver.service';
import { AuthGuard } from '../user/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ReviewEditComponent } from '../reviews/review-edit.component';
import { CommonModule } from '@angular/common';
import { SongListResolver } from './song-list-resolver.service';


@NgModule({
    declarations: [
        SongComponent,
        SongsListComponent,
        SongEditComponent,
        SongDetailComponent,
        ReviewEditComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'songs', component: SongsListComponent, resolve: { resolvedSongs: SongListResolver} },
            { path: 'songs/:id/edit', component: SongEditComponent, resolve: { resolvedData: SongResolver } },
            { path: 'songs/:id', component: SongDetailComponent, canActivate: [AuthGuard], resolve: { resolvedData: SongResolver } },
            { path: 'review/:id', component: ReviewEditComponent, canActivate: [AuthGuard] }
        ])
    ]
})
export class SongModule { }