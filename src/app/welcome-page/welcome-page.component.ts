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
  username: string | null = null;
  dialogRef: MatDialogRef<any> | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private storageService: StorageService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to username changes
    this.subscriptions.push(
      this.storageService.watchUsername().subscribe((username) => {
        this.username = username;
      })
    );
  }
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
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  onLogout(): void {
    this.storageService.clearLocalStorage();
  }
}
