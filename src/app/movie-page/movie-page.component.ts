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
  imports: [MovieCardModule, CommonModule, MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule, MatDividerModule],
  templateUrl: './movie-page.component.html',})

  export class MoviePageComponent {
    movie: any;

    constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      this.movie = navigation?.extras?.state?.['movie'];

      if (!this.movie) {
        this.router.navigate(['/movies']);
      }
    }

    returnToMovies(): void {
      this.router.navigate(['/movies']);
    }
  }
