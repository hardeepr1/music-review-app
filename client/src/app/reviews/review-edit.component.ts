import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { Review } from './review';
import { ReviewService } from './review.service';

@Component({
  selector: 'mra-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css'],
})
export class ReviewEditComponent implements OnInit {
  @Input() songId = 0;
  reviewForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      reviewComment: ['', Validators.required],
      rating: [null, Validators.required],
    });
  }

  //method to reset the contents of the form
  resetReviewForm(): void {
    this.reviewForm.patchValue({
      reviewComment: '',
      rating: null,
    });
  }

  postReview(): void {
    if (this.reviewForm.dirty) {
      var review: Review;
      const r = { ...review, ...this.reviewForm.value };
      r.reviewer = this.authService.getUserName();
      this.reviewService.createReview(r).subscribe({
        next: () => alert('review is posted'),
      });
    }
  }
}
