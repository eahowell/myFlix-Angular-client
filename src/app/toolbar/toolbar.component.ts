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
  username: string | null = null;
  hasToken: boolean = false;
  user: any = {};
  private subscriptions: Subscription[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private storageService: StorageService,
    private userState: UserStateService,
    public router: Router
  ) {}

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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onLogout(): void {
    this.storageService.clearLocalStorage();
    this.router.navigate(['welcome']);
  }
}
