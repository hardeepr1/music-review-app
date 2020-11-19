import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayList } from './playlist';
import { PlayListService } from './playlist-service';
import { error } from 'protractor';
import { SongsListComponent } from '../songs/songs-list.component';
import { Song } from '../songs/song';
import { SongService } from '../songs/song.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mra-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.css'],
})
export class PlaylistEditComponent implements OnInit {
  playlistForm: FormGroup;
  playList: PlayList;
  songs: Song[];
  //initially for time being no song is selected actually fetch from backend server
  selectedSong: String[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private playListService: PlayListService,
    private songService: SongService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.playlistForm = this.formBuilder.group({
      title: [' ', Validators.required],
      description: [' '],
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== '0') {
      const playList = this.route.snapshot.data['resolvedPlayList'];
      this.setPlayList(playList);
    } else {
      this.songService.getSongs().subscribe({
        next: (songs) => {
          this.songs = songs;
        },
      });
    }
  }

  setPlayList(playList: PlayList) {
    this.playList = playList;
    this.playlistForm.setValue({
      title: this.playList.title,
      description: this.playList.description,
    });
    this.getSongs(playList.songs);
  }

  getSongs(playListSongs: String[]) {
    this.songService.getSongs().subscribe({
      next: (songs) => {
        this.songs = songs.filter(
          (song) => playListSongs.indexOf(song.id) !== -1
        );
        console.log(this.songs);
      },
    });
  }

  postPlaylist(): void {
    this.playList = { ...this.playList, ...this.playlistForm.value };
    this.playList.songs = this.selectedSong;
    console.log(this.playList);
    this.playListService.createPlayList(this.playList).subscribe({
      next: (playlist) => console.log(playlist),
      error: (error) => console.log(error),
    });
  }

  selectSong(songId): void {
    if (this.selectedSong.indexOf(songId) === -1) {
      this.selectedSong.push(songId);
    } else {
      this.selectedSong.splice(this.selectedSong.indexOf(songId), 1);
    }
  }

  isSongSelected(songId): Boolean {
    return this.selectedSong.indexOf(songId) !== -1;
  }
}
