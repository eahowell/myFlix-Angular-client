/**
 * This component displays all movies in the database. Using the movie-card component, it displays each movie's title, image, and description.
 * Implements caching mechanism to reduce API calls and manages its own subscriptions.
 */
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-all-movies-page',
  templateUrl: './all-movies-page.component.html',
  styleUrl: './all-movies-page.component.scss',
})
export class AllMoviesPageComponent implements OnInit, OnDestroy {
  /** Array to store movies data for display. */
  movies: any[] = [];
  /** Array to store all active subscriptions for cleanup. */
  subscriptions: Subscription[] = [];
  /** Cache storage for movies data to reduce API calls. */
  moviesCache: any[] = [];
  /**
   * - Timestamp of the last successful movies fetch.
   * - Used for cache invalidation.
   */
  lastFetch: number = 0;
  /**
   * - Duration in milliseconds for which the cache is considered valid.
   * - Currently set to 15 minutes.
   */
  CACHE_DURATION = 15 * 60 * 1000;

  
  /** @param {FetchApiDataService} fetchApiData - Service for making API calls */
  constructor(public fetchApiData: FetchApiDataService) {}

  /**  Calls the getMovies method to fetch movies data. */
  ngOnInit(): void {
    this.getMovies();
  }
  /** Unsubscribes from all active subscriptions to prevent memory leaks. */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * - Fetches movies data with caching mechanism.
   * - If cached data is available and valid (within CACHE_DURATION),
   * - returns cached data instead of making an API call.
   * - Otherwise, fetches fresh data from the API and updates the cache.
   * @returns {Array} Returns an array of movie objects from the FetchApiDataService
   */
  getMovies(): void {
    const now = Date.now();
    if (this.moviesCache.length && now - this.lastFetch < this.CACHE_DURATION) {
      this.movies = this.moviesCache;
      return;
    }

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.moviesCache = resp;
      this.lastFetch = now;
    });
  }
}
