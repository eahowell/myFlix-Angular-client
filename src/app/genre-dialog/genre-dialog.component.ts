/**
 * Component for displaying genre information and related movies in a dialog.
 * Shows genre details and lists other movies in the same genre.
 * This component is typically opened as a modal dialog when users want to
 * explore more about a specific movie genre and discover similar movies.
 */
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrl: './genre-dialog.component.scss',
})
export class GenreDialogComponent implements OnInit {
  @Input() movie={
    _id: '',
    Title: '',
    Description: '',
    ImagePath: '',
    Genre: {Name: '', Description: ''},
    Director: {Name: '', Bio: '', Birthday: '', Death_day: ''},
  };
  /**
   * Array to store movies that share the same genre as the current movie.
   * Populated by loadMovieInSameGenre() method.
   */
  moviesInSameGenre: any[] = [];


  /**
   * Creates an instance of GenreDialogComponent.
   * Initializes the movie object with data passed through the dialog.
   * @param {FetchApiDataService} fetchApiData - Service for making API calls
   * @param {MatDialogRef<GenreDialogComponent>} dialogRef - Reference to the dialog containing this component
   * @param {MatSnackBar} snackBar - Service for displaying notification messages
   * @param {any} data - Data passed to the dialog, containing movie information
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  /** Triggers loading of movies in the same genre. */
  ngOnInit(): void {
    this.loadMovieInSameGenre();
  }

  /**
   * - Fetches and filters movies that share the same genre as the current movie.
   * - Updates moviesInSameGenre array with the filtered results.
   * - Displays an error message via snackbar if the API call fails.
   *
   * @returns {void} Returns an array of movie objects from the FetchApiDataService
   */
loadMovieInSameGenre(): void {
  this.fetchApiData.getAllMovies().subscribe({
    next: (movies) => {
      this.moviesInSameGenre = movies.filter((movie: any) =>
        this.movie.Genre.Name.includes(movie.Genre.Name)
      );
    },
    error: (error) => {
      this.snackBar.open('Error loading movies', 'OK', {
        duration: 2000
      });
    }
  });
  }
}
