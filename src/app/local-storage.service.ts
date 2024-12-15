/**
* - Service responsible for managing local storage operations with reactive state management.
* - Handles storage of user authentication data and provides observables for state changes.
* - Includes platform checking for SSR compatibility.
*
* @class StorageService
*/
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /** BehaviorSubject that holds and emits the current username */
  private usernameSubject = new BehaviorSubject<string | null>(null);
  /** BehaviorSubject that holds and emits the current auth token */
  private tokenSubject = new BehaviorSubject<string | null>(null);
  /** Flag indicating if code is running in browser context */
  private isBrowser: boolean;


  /**
  * Initializes the service and sets up storage event listeners
  * @param {Object} platformId - Angular's platform identifier token
  */
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Initialize with current values
      this.usernameSubject.next(localStorage.getItem('user'));
      this.tokenSubject.next(localStorage.getItem('token'));

      // Listen for storage events
      window.addEventListener('storage', (event) => {
        switch (event.key) {
          case 'user':
            this.usernameSubject.next(event.newValue);
            break;
          case 'token':
            this.tokenSubject.next(event.newValue);
            break;
        }
      });

      // Override localStorage.setItem to catch local changes
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function(key: string, value: string) {
        const event = new StorageEvent('storage', {
          key: key,
          newValue: value,
          oldValue: localStorage.getItem(key),
          storageArea: localStorage
        });

        originalSetItem.apply(this, [key, value]);
        window.dispatchEvent(event);
      };
    }
  }

 /**
  * Safely sets a value in localStorage
  * @private
  * @param {string} key - Storage key to set
  * @param {string | null} value - Value to store
  */
  private setToStorage(key: string, value: string | null): void {
    if (this.isBrowser) {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    }
  }


  /**
  * Gets the current username value
  * @returns {string | null} Current username or null
  */
  getCurrentUsername(): string | null {
    return this.usernameSubject.getValue();
  }

  /**
  * Gets the current token value
  * @returns {string | null} Current token or null
  */
  getCurrentToken(): string | null {
    return this.tokenSubject.getValue();
  }

  /**
  * Returns an observable of username changes
  * @returns {Observable<string | null>} Observable stream of username
  */
  watchUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  /**
  * Returns an observable of token changes
  * @returns {Observable<string | null>} Observable stream of token
  */
  watchToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  /**
  * Sets the current username in storage and updates the subject
  * @param {string | null} username - Username to store
  */
  setUsername(username: string | null) {
    this.setToStorage('user', username);
    this.usernameSubject.next(username);
  }

  /**
  * Sets the current token in storage and updates the subject
  * @param {string | null} token - Token to store
  */
  setToken(token: string | null) {
    this.setToStorage('token', token);
    this.tokenSubject.next(token);
  }

  /** Clears the current username and token from storage and subjects */
  clearLocalStorage() {
    if (this.isBrowser) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.usernameSubject.next(null);
    this.tokenSubject.next(null);
  }
}
