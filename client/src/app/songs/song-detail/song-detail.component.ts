import { Component, OnInit } from '@angular/core';
import { Song, SongResolved } from '../song';
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { ReviewService } from 'src/app/reviews/review.service';
import { Review } from 'src/app/reviews/review';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'mra-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css'],
})
export class SongDetailComponent implements OnInit {
  song: Song;

  reviews: Review[];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router,
    private authService: AuthService
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    const songResolved: SongResolved = this.route.snapshot.data['resolvedData'];

    if (songResolved.error) {
      this.handlerError(songResolved.error);
    } else {
      this.reviewService.getReviewSong(songResolved.song.id).subscribe({
        next: (reviews) => (this.reviews = reviews),
      });
      this.song = songResolved.song;
    }
  }

  handlerError(error: HttpErrorResponse) {
    //if user is not authorised re-route to login page
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }
}
