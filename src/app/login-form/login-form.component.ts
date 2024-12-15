// src/app/login-form/login-form.component.ts
/**
 * Component for handling user login functionality.
 * Provides a form interface for user authentication and manages the login process.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../local-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  /**
   * Input data model for the login form.
   * @property {Object} loginData - Contains user credentials
   * @property {string} loginData.Username - User's username
   * @property {string} loginData.Password - User's password
   */
  @Input() loginData = {
    Username: '',
    Password: '',
  };

  /**
   * @param {FetchApiDataService} fetchApiData - Service for making API calls
   * @param {MatDialogRef<LoginFormComponent>} dialogRef - Reference to the dialog containing this component
   * @param {MatSnackBar} snackBar - Service for displaying notification messages
   * @param {Router} router - Angular router for navigation
   * @param {StorageService} storageService - Service for managing local storage
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

   /**
   * Handles the user login process.
   * Converts username to lowercase, sends login request to the API,
   * and handles the response appropriately.
   *
   * On successful login:
   * - Stores the authentication token
   * - Stores the username
   * - Closes the login dialog
   * - Navigates to the movies page
   * - Shows a success message
   *
   * On failed login:
   * - Logs the error details
   * - Shows an error message to the user
   *
   * @throws HttpErrorResponse When the API call fails
   */
  loginUser(): void {
    const loginDataToSend = {
      ...this.loginData,
      Username: this.loginData.Username.toLowerCase()
    };

    this.fetchApiData.userLogin(loginDataToSend.Username, loginDataToSend.Password).subscribe({
      next: (response) => {
        this.storageService.setToken(response.token);
    this.storageService.setUsername(response.user.Username);
        // UserState service will automatically fetch user data when username is set
        this.dialogRef.close();
        this.router.navigate(['movies']);
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000
        });
      },
      error: (error: HttpErrorResponse) => {
      console.log('Error status:', error.status);
      console.log('Error body:', error.error);
      let errorMessage = 'Something went wrong! Please try again later.';
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
      console.log('Final error message:', errorMessage);

        this.snackBar.open(errorMessage, 'OK', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}

