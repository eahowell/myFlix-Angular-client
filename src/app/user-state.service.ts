/**
 * - Service responsible for managing and synchronizing user state across the application.
 * - Handles user data loading, caching, and updates using RxJS BehaviorSubject.
 *
 * @class UserStateService
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FetchApiDataService } from './fetch-api-data.service';
import { StorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  /** BehaviorSubject that holds and emits the current user data state */
  userSubject = new BehaviorSubject<any>(null);

  /**
   * Initializes the service and sets up subscriptions to monitor user authentication state
   * @param {FetchApiDataService} fetchApiData - Service for handling API requests
   * @param {StorageService} storageService - Service for managing local storage operations
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private storageService: StorageService
  ) {
    // Initialize user data when service starts
    this.storageService.watchUsername().subscribe((user) => {
      if (user) {
        this.loadUserData(user);
      } else {
        this.userSubject.next(null);
      }
    });
    this.storageService.watchToken().subscribe(token => {
      const username = this.storageService.getCurrentUsername();
      if (username && token) {
        this.loadUserData(username);
      }
    });
  }

   /**
   * Fetches user data from the API and updates the user subject
   * @param {string} username - Username of the user to load data for
   */
  public loadUserData(username: string): void {
    this.fetchApiData.getUser(username).subscribe({
      next: (userData) => {
        this.userSubject.next(userData);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.userSubject.next(null);
      }
    });
  }

  /**
   * Returns an observable of the current user data
   * @returns {Observable<any>} Observable stream of user data
   */
  public getUserData(): Observable<any> {
    return this.userSubject.asObservable();
  }

   /** Forces a refresh of the user data from the API */
  public refreshUserData(): void {
    const username = this.storageService.getCurrentUsername();
    if (username) {
      this.loadUserData(username);
    }
  }

  /**
   * Updates the current user data in the BehaviorSubject
   * @param {any} updatedData - New user data to be set
   */
  public updateUserData(updatedData: any): void {
    this.userSubject.next(updatedData);
  }
}
