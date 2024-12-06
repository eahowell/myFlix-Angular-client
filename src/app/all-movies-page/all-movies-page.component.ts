import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-all-movies-page',
  templateUrl: './all-movies-page.component.html',
  styleUrl: './all-movies-page.component.scss'
})
export class AllMoviesPageComponent implements OnInit, OnDestroy {

  movies: any[] = [];
  private subscriptions: Subscription[] = [];
  private moviesCache: any[] = [];
  private lastFetch: number = 0;
  private CACHE_DURATION = 15 * 60 * 1000;

  constructor(
    public fetchApiData: FetchApiDataService,
  ) {}

  ngOnInit(): void {
    this.getMovies();

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


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

