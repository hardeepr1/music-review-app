import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsListComponent } from './reviews/reviews-list.component';
import { PlaylistEditComponent } from './playlists/playlist-edit.component';
import { PlayListResolver } from './playlists/playlist-resolver.service';
import { PlaylistsComponent } from './playlists/playlists.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reviews', component: ReviewsListComponent },
  //this is a playlist component
  { path: 'playlists', component: PlaylistsComponent },
  {
    path: 'playlist/:id',
    component: PlaylistEditComponent,
    resolve: { resolvedPlayList: PlayListResolver },
  },
  { path: 'playlist', component: PlaylistEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
