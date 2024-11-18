import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isBrowser: boolean;

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

  private getFromStorage(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setToStorage(key: string, value: string | null): void {
    if (this.isBrowser) {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    }
  }

  getCurrentUsername(): string | null {
    return this.usernameSubject.getValue();
  }

  getCurrentToken(): string | null {
    return this.tokenSubject.getValue();
  }

  watchUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  watchToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  setUsername(username: string | null) {
    this.setToStorage('user', username);
    this.usernameSubject.next(username);
  }

  setToken(token: string | null) {
    this.setToStorage('token', token);
    this.tokenSubject.next(token);
  }

  clearLocalStorage() {
    if (this.isBrowser) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.usernameSubject.next(null);
    this.tokenSubject.next(null);
  }
}
