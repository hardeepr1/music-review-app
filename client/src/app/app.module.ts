import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReviewsListComponent } from './reviews/reviews-list.component';
import { AuthInterceptor } from './user/auth.interceptor';
import { UserModule } from './user/user.module';
import { SongModule } from './songs/song.module';
import { PlaylistEditComponent } from './playlists/playlist-edit.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists/playlists.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsListComponent,
    PlaylistEditComponent,
    PlaylistsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    SongModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
