import { Component, OnInit } from '@angular/core';
import { PlayListService } from './playlist-service';
import { PlayList } from './playlist';

@Component({
  selector: 'mra-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit {
  playLists: PlayList[];
  constructor(private playListService: PlayListService) {}

  ngOnInit(): void {
    this.playListService.getPlayLists().subscribe({
      next: (playLists) => {
        this.playLists = playLists;
      },
    });
  }
}
