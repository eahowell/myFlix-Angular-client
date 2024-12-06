// profile-page.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStateService } from '../user-state.service';
import { Subscription } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UserUpdateData {
  Username: string;
  Email: string;
  Birthday: Date | string;
  FirstName: string;
  LastName: string;
  Password?: string;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: any = null;
  originalData: any = null;
  dataToUpdate: any = null;
  favoriteMovies: any[] = [];
  toWatchMovies: any[] = [];
  editMode: boolean = false;
  newPassword: string = '';
  private subscriptions: Subscription[] = [];
  private allMovies: any[] = [];

  constructor(
    private userState: UserStateService,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userState.getUserData().subscribe((userData) => {
        this.user = userData;
        if (
          userData &&
          (userData?.FavoriteMovies?.length || userData?.ToWatch?.length)
        ) {
          this.loadUserMovies();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadUserMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => {
        this.allMovies = movies;
        this.favoriteMovies = movies.filter((movie: any) =>
          this.user.FavoriteMovies.includes(movie._id)
        );
        this.toWatchMovies = movies.filter((movie: any) =>
          this.user.ToWatch.includes(movie._id)
        );
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Error loading movies', 'OK', {
          duration: 2000,
        });
      },
    });
  }
  updateProfile(updatedData: any): void {
    const dataToUpdate: UserUpdateData = {
      Username: this.user.Username,
      Email: this.user.Email,
      Birthday: this.user.Birthday,
      FirstName: this.user.FirstName,
      LastName: this.user.LastName
    };

    // Only include password if a new one was entered
    if (this.newPassword) {
      dataToUpdate.Password = this.newPassword;
    }

    this.fetchApiData.updateUser(dataToUpdate).subscribe({
      next: (response) => {
        this.userState.updateUserData(response);
        this.newPassword = ''; // Clear password field after successful update
        this.snackBar.open('Profile updated successfully', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.error('Update error:', error);
        this.snackBar.open(error.error || 'Failed to update profile', 'OK', {
          duration: 2000,
        });
      },
    });
}

  saveChanges() {
    this.updateProfile(this.user);
    this.editMode = false;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) this.originalData = { ...this.user };
  }

  cancelEdit() {
    this.user = { ...this.originalData };
    this.editMode = false;
  }
}
