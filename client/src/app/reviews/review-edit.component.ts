import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private reviewService: ReviewService
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
      //We need have songId passed from parent component
      //r.songId = this.song.id;
      //todo: set actual user here
      r.reviewer = 'har';
      this.reviewService.createReview(r).subscribe({
        next: () => alert('review is posted'),
      });
    }
  }
}
