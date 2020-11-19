import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'mra-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'music-review-app';

  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    if (this.authService.currentUserName) {
      return this.authService.currentUserName;
    }
    return '';
  }

  ngOnInit() {
    // this.authService.currentUserName$.subscribe(name => {
    //   console.log(name);
    //   this.userName = name
    // });
  }

  logOut(): void {
    this.authService.logOut();
    console.log('Logged Out');
  }
}
