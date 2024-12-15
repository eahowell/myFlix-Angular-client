// movie-card.component.ts
/**
 * Component for displaying individual movie cards with interactive features.
 * Handles movie information display, user interactions like favorites and watch list, and opens various dialogs for detailed information.
 */
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
/** Input property containing detailed movie information. */
  @Input() movie={
    _id: '',
    Title: '',
    Description: '',
    ImagePath: '',
    Genre: {Name: '', Description: ''},
    Director: {Name: '', Bio: '', Birthday: '', Death_day: '', TopMovies:{Title: ''}},
  };

  /** Current user data from UserStateService */
  user: any = null;

   /** Array to store and manage component subscriptions */
  subscriptions: Subscription[] = [];

  /**
   * Creates an instance of MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - Service for API calls
   * @param {UserStateService} userState - Service for managing user state
   * @param {MatDialog} dialog - Service for opening dialogs
   * @param {Router} router - Angular router service
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private userState: UserStateService,
    public dialog: MatDialog,
    private router: Router,
  ) {}


/** Initializes component by subscribing to user data. */
  ngOnInit(): void {
    this.subscriptions.push(
      this.userState.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  /** Cleans up subscriptions when component is destroyed. */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Checks if a movie is in user's favorites.
   * @param {string} movieId - Movie identifier
   * @returns {boolean} True if movie is in favorites
   */
  isFavorite(movieId: string): boolean {
    return this.user?.FavoriteMovies?.includes(movieId) || false;
  }

  /**
   * Toggles a movie's favorite status.
   * Adds or removes movie from user's favorites list.
   * @param {string} movieId - Movie identifier
   */
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

 /**
   * Checks if a movie is in user's watch list.
   * @param {string} movieId - Movie identifier
   * @returns {boolean} True if movie is in watch list
   */
  isToWatch(movieId: string): boolean {
    return this.user?.ToWatch?.includes(movieId) || false;
  }


  /**
   * Toggles a movie's watch list status.
   * Adds or removes movie from user's watch list.
   * @param {string} movieId - Movie identifier
   */
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

  /**
   * Opens a dialog showing genre information.
   * @param {any} movie - Movie object containing genre details
   */
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

  /**
   * Opens a dialog showing director information.
   * @param {any} movie - Movie object containing director details
   */
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


   /**
   * Opens a dialog showing movie synopsis.
   * @param {any} movie - Movie object containing synopsis details
   */
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

  /**
   * Navigates to detailed movie view.
   * Passes movie data through router state.
   */
  openMovieDetails(): void {
    this.router.navigate(['/movie', this.movie._id], {
      state: { movie: this.movie }
    });
  }
}
