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
    Director: {Name: '', Bio: '', Birthday: '', Death_day: '', TopMovies:{Title: ''}},
  };
  moviesInSameGenre: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {
    this.loadMovieInSameGenre();
  }

loadMovieInSameGenre(): void {
  this.fetchApiData.getAllMovies().subscribe({
    next: (movies) => {
      this.moviesInSameGenre = movies.filter((movie: any) =>
        this.movie.Genre.Name.includes(movie.Genre.Name)
      );
    },
    error: (error) => {
      this.snackBar.open('Error loading favorite movies', 'OK', {
        duration: 2000
      });
    }
  });
  }
}
