// profile-page.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStateService } from '../user-state.service';
import { Subscription } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: any = null;
  favoriteMovies: any[] = [];
  toWatchMovies: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private userState: UserStateService,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userState.getUserData().subscribe(userData => {
        this.user = userData;
        if (userData?.FavoriteMovies?.length) {
          this.loadFavoriteMovies();
        }
        if (userData?.ToWatch.length) {
          this.loadToWatchMovies();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => {
        this.favoriteMovies = movies.filter((movie: any) =>
          this.user.FavoriteMovies.includes(movie._id)
        );
      },
      error: (error) => {
        this.snackBar.open('Error loading favorite movies', 'OK', {
          duration: 2000
        });
      }
    });
  }

  loadToWatchMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => {
        this.toWatchMovies = movies.filter((movie: any) =>
          this.user.ToWatch.includes(movie._id)
        );
      },
      error: (error) => {
        this.snackBar.open('Error loading to watch movies', 'OK', {
          duration: 2000
        });
      }
    });
  }
  updateProfile(updatedData: any): void {
    this.fetchApiData.updateUser(updatedData).subscribe({
      next: (response) => {
        this.userState.updateUserData(response);
        this.snackBar.open('Profile updated successfully', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {
        this.snackBar.open('Failed to update profile', 'OK', {
          duration: 2000
        });
      }
    });
  }
}
