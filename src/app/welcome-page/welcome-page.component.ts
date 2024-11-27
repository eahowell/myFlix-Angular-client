import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, MatTooltipModule],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
      panelClass: 'registration-dialog-container',
    });
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
    });
  }
}
