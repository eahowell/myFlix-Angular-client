// src/app/login-form/login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  @Input() loginData = {
    Username: '',
    Password: '',
  };

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {}

  loginUser(): void {
    // Ensure username is lowercase before sending to API server
    const loginDataToSend = {
      ...this.loginData,
      Username: this.loginData.Username.toLowerCase()
    };

    this.fetchApiData.userLogin(loginDataToSend.Username, loginDataToSend.Password).subscribe({
      next: (response) => {
      this.dialogRef.close(); // This will close the modal on success!
      console.log('User successfully logged in!');
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      this.router.navigate(['movies']);
      this.snackBar.open('User successfully logged in!', 'OK', {
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

