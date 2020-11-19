import { Component, OnInit } from '@angular/core';
import { SongService } from './song.service';
import { Song } from './song';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mra-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent implements OnInit {
  songs: Song[];
  _songFilter: string = '';
  filteredSongs: Song[];

  constructor(
    private route: ActivatedRoute,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.songs = this.route.snapshot.data['resolvedSongs'];
    this.filteredSongs = this.songs;
  }

  get songFilter(): string {
    return this._songFilter;
  }

  set songFilter(value: string) {
    this._songFilter = value;
    this.filteredSongs =
      this.songFilter.length > 0
        ? this.performSearch(this.songFilter)
        : this.songs;
  }

  performSearch(searchString: string): Song[] {
    searchString = searchString.toLocaleLowerCase();
    return this.songs.filter(
      (product) =>
        product.songTitle.toLocaleLowerCase().indexOf(searchString) !== -1
    );
  }
}
