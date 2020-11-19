import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Song, SongResolved } from '../song';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';

@Component({
  selector: 'mra-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css'],
})
export class SongEditComponent implements OnInit {
  songForm: FormGroup;
  errorMessage: String;
  formTitle: String = 'Song Edit';

  song: Song;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService,
    private location: Location
  ) {}

  //to do need to do error handling
  ngOnInit(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    this.songForm = this.formBuilder.group({
      songTitle: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['', Validators.required],
      year: ['', Validators.required],
      genre: ['', Validators.required],
      comment: ['', Validators.required],
    });
    const songResolved: SongResolved = this.route.snapshot.data['resolvedData'];
    console.log(songResolved);
    this.displaySong(songResolved.song);
    //this.getSong(id);
  }

  getSong(id: String): void {
    this.songService.getSong(id).subscribe({
      next: (song) => this.displaySong(song),
    });
  }

  displaySong(song: Song) {
    this.song = song;
    if (this.songForm) {
      this.songForm.reset();
    }

    this.songForm.patchValue({
      songTitle: this.song.songTitle,
      artist: this.song.artist,
      album: this.song.album,
      year: this.song.year,
      genre: this.song.genre,
      comment: this.song.comment,
    });
  }

  onSaveClicked(): void {
    //have a validation check for the entire form
    if (this.songForm.dirty) {
      const p = { ...this.song, ...this.songForm.value };

      if (p.id === 0) {
        //create product code goes here
      } else {
        this.songService.updateSong(p).subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  onSaveComplete() {
    this.songForm.reset();
    this.router.navigate(['/songs']);
  }

  onCancelClicked(): void {
    console.log('cancel clicked');
    this.location.back();
  }

  onDeleteClicked(): void {
    this.songService.deleteSong(this.song.id).subscribe({
      next: () => this.onSaveComplete(),
      error: (err) => (this.errorMessage = err),
    });
  }
}
