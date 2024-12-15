/**
 * - Welcome page component that serves as the landing page of the application.
 * - Handles user registration and login functionality through dialog interactions.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { StorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
  ],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  /** Current username of the logged-in user */
  username: string | null = null;
  /** Reference to the currently open dialog */
  dialogRef: MatDialogRef<
    UserRegistrationFormComponent | LoginFormComponent
  > | null = null;
  /** Array to store all component subscriptions for cleanup */
  subscriptions: Subscription[] = [];

  /**
   * @param {StorageService} storageService - Service for managing local storage operations
   * @param {MatDialog} dialog - Material Dialog service for opening modal dialogs
   * @param {Router} router - Angular router service for navigation
   */
  constructor(
    private storageService: StorageService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  /** Sets up subscription to monitor username changes. */
  ngOnInit(): void {
    // Subscribe to username changes
    this.subscriptions.push(
      this.storageService.watchUsername().subscribe((username) => {
        this.username = username;
      })
    );
  }

  /**
   * - Opens the user registration dialog with specified configuration.
   * - Manages dialog reference and cleanup after dialog is closed.
   */
  openUserRegistrationDialog(): void {
    this.dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
      panelClass: 'registration-dialog-container',
      ariaLabel: 'User Registration Dialog',
      role: 'dialog',
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

  /**
   * - Opens the login dialog with specified configuration.
   * - Manages dialog reference and cleanup after dialog is closed.
   */
  openLoginDialog(): void {
    this.dialogRef = this.dialog.open(LoginFormComponent, {
      maxWidth: '450px',
      width: '95%',
      maxHeight: '100vh',
      autoFocus: false,
      ariaLabel: 'Login Dialog',
      role: 'dialog',
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

  /** Cleans up component subscriptions on destruction. */
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /** Logs out the user and clears local storage. */
  onLogout(): void {
    this.storageService.clearLocalStorage();
  }
}
