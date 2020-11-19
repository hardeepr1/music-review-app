export interface Song{
    id: string,
    songTitle: string,
    artist: string,
    album: string,
    year: number,
    comment: string,
    genre: string
}

export interface SongResolved {
    song: Song;
    error?: any;
  }