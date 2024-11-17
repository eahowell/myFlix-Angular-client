import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { AsyncLocalStorage } from 'async_hooks';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ToolbarComponent implements OnInit{
  user: any = {};
  constructor(public fetchApiData: FetchApiDataService) { }
  ngOnInit(): void {
    this.getUser();
  }

  isFavorite(movieId: string): boolean {
    return this.user.FavoriteMovies.includes(movieId);
  }

  getUser(): void {
    const username = localStorage.getItem('user');
  if (username) {
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  } else {
    console.error('User is null');
  }
}

onLogout(): void {
  localStorage.clear();
  console.log('You have been logged out');
  window.open('/', '_self');
}

}
