import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Review } from './review';
import { ReviewService } from './review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mra-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css'],
})
export class ReviewsListComponent implements OnInit {
  reviews: Review[];

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('songId');
    this.reviewService.getReviewSong(id).subscribe({
      next: (reviews) => (this.reviews = reviews),
    });
  }

  navigateBack(): void {
    this.location.back();
  }
}
