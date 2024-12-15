/**
 * - Main toolbar component that handles the application's top navigation bar.
 * - Manages user authentication state and provides navigation controls.
 */
import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FetchApiDataService } from '../fetch-api-data.service';
import { StorageService } from '../local-storage.service';
import { UserStateService } from '../user-state.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, MatTooltipModule],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  /** Current username of the logged-in user */
  username: string | null = null;
  /** Flag indicating whether a valid authentication token exists */
  hasToken: boolean = false;
  /** Object containing detailed user information */
  user: any = {};
  /** Array to store all component subscriptions for cleanup */
  subscriptions: Subscription[] = [];

  /**
   * @param {FetchApiDataService} fetchApiData - Service for handling API requests
   * @param {StorageService} storageService - Service for managing local storage operations
   * @param {UserStateService} userState - Service for managing user state
   * @param {Router} router - Angular router service for navigation
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private storageService: StorageService,
    private userState: UserStateService,
    public router: Router
  ) {}

  /** Sets up subscriptions to monitor user data, username, and token changes. */
  ngOnInit(): void {
    // Subscribe to user data
    this.subscriptions.push(
      this.userState.getUserData().subscribe(userData => {
        this.user = userData;
      })
    );

    // Subscribe to username changes
    this.subscriptions.push(
      this.storageService.watchUsername().subscribe((username) => {
        this.username = username;
      })
    );

    // Subscribe to token changes
    this.subscriptions.push(
      this.storageService.watchToken().subscribe((token) => {
        this.hasToken = !!token;
      })
    );
  }

  /** Cleans up component subscriptions on destruction. */
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /** Handles user logout by clearing local storage and redirecting to welcome page. */
  onLogout(): void {
    this.storageService.clearLocalStorage();
    this.router.navigate(['welcome']);
  }
}
