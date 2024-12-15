// src/app/user-registration-form/user-registration-form.component.ts
/**
 * - Component for handling new user registration.
 * - Provides a form interface for collecting user information and manages the registration process.
 * - Includes comprehensive error handling for various registration scenarios.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * - Input data model for the registration form.
   * - All fields are required for successful registration.
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FirstName: '',
    LastName: '',
  };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service for making API calls
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog containing this component
   * @param {MatSnackBar} snackBar - Service for displaying notification messages
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Handles the user registration process.
   * Converts username to lowercase and sends registration request to the API.
   *
   * On successful registration:
   * - Closes the registration dialog
   * - Logs the response
   * - Shows a success message prompting user to login
   *
   * Handles various error scenarios with specific messages:
   * @throws 400: Missing required fields
   * @throws 409: Username already taken
   * @throws 422: Invalid input format
   * @throws 500: Server error
   */
  registerUser(): void {
    // Create a copy of userData with lowercase username
    const userDataToSend = {
      ...this.userData,
      Username: this.userData.Username.toLowerCase(),
    };

    this.fetchApiData.userRegistration(userDataToSend).subscribe({
      next: (response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('User successfully registered! Login with your new account.', 'OK', {
          duration: 10000,
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error status:', error.status);
        console.log('Error body:', error.error);

        let errorMessage = 'Something went wrong! Please try again later.';

        switch (error.status) {
          case 400:
            errorMessage = 'Please check your input - all fields are required.';
            break;
          case 409:
            errorMessage =
              'This username is already taken. Please choose another.';
            break;
          case 422:
            errorMessage = 'Invalid input format. Please check your details.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
        }

        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        console.log('Final error message:', errorMessage);

        this.snackBar.open(errorMessage, 'OK', {
          duration: 25000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
