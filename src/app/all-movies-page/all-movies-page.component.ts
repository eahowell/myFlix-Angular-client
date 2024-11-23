import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserStateService } from '../user-state.service';
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

  constructor(
    public fetchApiData: FetchApiDataService,
    private userState: UserStateService
  ) {}

  ngOnInit(): void {
    this.getMovies();

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
 

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}

