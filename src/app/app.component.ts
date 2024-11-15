// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlix';
  // currentTheme = 'light';
  // toggleTheme() {
  //   this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  //   document.body.className = this.currentTheme; // Apply the theme class to <body>
  // }
  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
      panelClass: 'registration-dialog-container'
    });
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false
    });
  }
  openMoviesDialog(): void {
    const dialogRef = this.dialog.open(MovieCardComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '95vh',
      autoFocus: false
    });
  }
}
