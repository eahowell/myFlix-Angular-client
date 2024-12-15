// profile-page.component.ts

/**
 * - Component for managing user profile information.
 * - Provides functionality for viewing and editing user details, managing favorite movies, watch list, and account deletion.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStateService } from '../user-state.service';
import { Subscription } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../local-storage.service';
import { Router } from '@angular/router';

/**
 * - Interface defining the structure of user update data.
 * - Used when sending profile updates to the API.
 */
interface UserUpdateData {
  Username: string;
  Email: string;
  Birthday: Date | string;
  FirstName: string;
  LastName: string;
  Password?: string; // Optional as it's only included when being updated
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  /** Current user data */
  user: any = null;
  /** Backup of original user data for canceling edits */
  originalData: any = null;
  /** Data prepared for update operation */
  dataToUpdate: any = null;
  /** User's favorite movies list */
  favoriteMovies: any[] = [];
  /** User's "to watch" movies list */
  toWatchMovies: any[] = [];
  /** Flag for edit mode state */
  editMode: boolean = false;
  /** New password input field */
  newPassword: string = '';
  /** Array to manage component subscriptions */
  subscriptions: Subscription[] = [];
  /** Cache of all movies data */
  private allMovies: any[] = [];

  /**
   * Creates an instance of ProfilePageComponent.
   * @param {UserStateService} userState - Service for managing user state
   * @param {FetchApiDataService} fetchApiData - Service for API calls
   * @param {StorageService} storageService - Service for local storage operations
   * @param {MatSnackBar} snackBar - Service for displaying notifications
   * @param {Router} router - Angular router service
   */
  constructor(
    private userState: UserStateService,
    private fetchApiData: FetchApiDataService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {}

   /** Initializes component by subscribing to user data and loading movies. */
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

  /** Cleans up component subscriptions on destruction. */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * - Loads and filters movies for user's favorites and watch list.
   * - Updates local movie arrays with filtered results.
   * @throws {Error} - Error message if API call fails
   */
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

   /**
   * - Updates user profile information.
   * - Optionally includes password if a new one is provided.
   * @param {any} updatedData - New user data to be saved
   */
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


/**
   * - Deletes user account and redirects to welcome page.
   * - Clears local storage upon successful deletion.
   */
deleteUser(): void {
  this.fetchApiData.deleteUser(this.user.Username).subscribe({
    next: (response) => {
      this.storageService.clearLocalStorage();
      this.router.navigate(['welcome']);
      this.snackBar.open('User deleted', 'OK', {
        duration: 2000,
      });
    },
    error: (error) => {
      console.error('Delete error:', error);
      this.snackBar.open(error.error || 'Failed to delete user', 'OK', {
        duration: 2000,
      });
    },
  });
}

  /**
   * - Toggles edit mode for user profile.
   * - Saves original data for canceling edits.
   */
  saveChanges() {
    this.updateProfile(this.user);
    this.editMode = false;
  }

  /** Toggles edit mode and creates backup of current data. */
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) this.originalData = { ...this.user };
  }

  /** Cancels edit mode and restores original data. */
  cancelEdit() {
    this.user = { ...this.originalData };
    this.editMode = false;
  }
}
