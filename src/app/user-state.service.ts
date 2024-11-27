import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FetchApiDataService } from './fetch-api-data.service';
import { StorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(
    private fetchApiData: FetchApiDataService,
    private storageService: StorageService
  ) {
    // Initialize user data when service starts
    this.storageService.watchUsername().subscribe(user => {
      if (user) {
        this.loadUserData(user);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  private loadUserData(username: string): void {
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

  public getUserData(): Observable<any> {
    return this.userSubject.asObservable();
  }

  public refreshUserData(): void {
    const username = this.storageService.getCurrentUsername();
    if (username) {
      this.loadUserData(username);
    }
  }

  public updateUserData(updatedData: any): void {
    this.userSubject.next(updatedData);
  }
}
