// movie-card.component.ts
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserStateService } from '../user-state.service';
import { Subscription } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})

export class MovieCardComponent implements OnInit, OnDestroy {

  @Input() movie={
    _id: '',
    Title: '',
    Description: '',
    ImagePath: '',
    Genre: {Name: '', Description: ''},
    Director: {Name: '', Bio: '', Birthday: '', Death_day: '', TopMovies:{Title: ''}},
  };

  user: any = null;
  private subscriptions: Subscription[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private userState: UserStateService,
    public dialog: MatDialog,
    private router: Router,
  ) {}



  ngOnInit(): void {
    this.subscriptions.push(
      this.userState.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  isFavorite(movieId: string): boolean {
    return this.user?.FavoriteMovies?.includes(movieId) || false;
  }

  toggleFavorite(movieId: string): void {
    if (!this.user) return;

    const username = this.user.Username;
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavorite(username, movieId).subscribe(() => {
        this.userState.refreshUserData();
      });
    } else {
      this.fetchApiData.addFavorite(username, movieId).subscribe(() => {
        this.userState.refreshUserData();
      });
    }
  }
  isToWatch(movieId: string): boolean {
    return this.user?.ToWatch?.includes(movieId) || false;
  }

  toggleToWatch(movieId: string): void {
    if (!this.user) return;

    const username = this.user.Username;
    if (this.isToWatch(movieId)) {
      this.fetchApiData.deleteToWatch(username, movieId).subscribe(() => {
        this.userState.refreshUserData();
      });
    } else {
      this.fetchApiData.addToWatch(username, movieId).subscribe(() => {
        this.userState.refreshUserData();
      });
    }
  }
  openGenreDialog(movie: any): void {
    const dialogRef = this.dialog.open(GenreDialogComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
      panelClass: 'genre-dialog-container',
      data: { movie: movie }
    });
  }
  openDirectorDialog(movie: any): void {
    const dialogRef = this.dialog.open(DirectorDialogComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
      panelClass: 'director-dialog-container',
      data: { movie: movie }
    });
  }

  openSynopsisDialog(movie: any): void {
    const dialogRef = this.dialog.open(SynopsisDialogComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
      panelClass: 'synopsis-dialog-container',
      data: { movie: movie }
    });
  }
  openMovieDetails(): void {
    this.router.navigate(['/movie', this.movie._id], {
      state: { movie: this.movie }
    });
  }
}
