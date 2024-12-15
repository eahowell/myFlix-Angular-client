import { MatDividerModule } from '@angular/material/divider';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieCardModule } from '../movie-card/movie-card.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [
    MovieCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './movie-page.component.html',
})
export class MoviePageComponent {
  /**
   * - Holds the movie data received from router navigation state.
   * - Type 'any' is used to accommodate varying movie data structures.
   * @property {any} movie - The movie object containing details to display
   */
  movie: any;


  /**
   * Creates an instance of MoviePageComponent.
   * - Retrieves movie data from router navigation state.
   * - Redirects to movies list if no movie data is found.
   *
   * @param {Router} router - Angular router service for navigation
   */
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.movie = navigation?.extras?.state?.['movie'];

    if (!this.movie) {
      this.router.navigate(['/movies']);
    }
  }
  /**
   * Navigates back to the movies list page.
   * Used for the return/back functionality in the UI.
   */
  returnToMovies(): void {
    this.router.navigate(['/movies']);
  }
}
