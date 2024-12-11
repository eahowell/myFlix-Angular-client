import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private apiUrl = 'https://myflix-eahowell-7d843bf0554c.herokuapp.com';
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  // Private method to get headers
  private getHeaders(): HttpHeaders {
    const token = this.storageService.getCurrentToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private extractResponseData(res: any): any {
    return res || {};
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => error);
    // return throwError(() => new Error(errorMessage));
    // throw new Error(errorMessage);
  }

  // CREATE - POST - Allow new users to register;  (username, password, first name, last name, email, date of birth)
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/users`, userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // CREATE - POST - Allow users to login;  (using username and password)
  public userLogin(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/login`,
        {
          Username: username,
          Password: password,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // READ - GET - Return a list of ALL movies to the user
  public getAllMovies(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movies`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // READ - GET - Return data about a single movie by title to the user
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movies/${title}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // READ - GET - Return a list of ALL genres to the user
  public getAllGenres(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/genres`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // READ - GET - Return data about a genre (description) by name (e.g., “Thriller”)
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/genres/${genreName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // READ - GET - Return a list of ALL directors to the user
  public getAllDirectors(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/directors`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // READ - GET - Return data about a director (bio, birth year, death year) by name
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/directors/${directorName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // READ - GET - Return the details of a specific to the user
  public getUser(username: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/users/${username}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // UPDATE - PUT - Allow users to update their user info (email, first name, last name, and password)
  // Only those fields can be updated because we don't want username, userID, and DOB to be changed
  public updateUser(userDetails: any): Observable<any> {
    console.log({ ...userDetails });
    return this.http
      .put(`${this.apiUrl}/users/${userDetails.Username}`, userDetails, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE - Allow existing users to deregister (Delete account)
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/users/${username}`, {
        headers: this.getHeaders(),
        responseType: 'text', // Specify the response type as text
      })
      .pipe(
        map((response: string) => {
          console.log(response); // Log the server response for debugging
          return { message: response }; // Wrap the response in an object for consistency
        }),
        catchError(this.handleError) // Use the existing error handler
      );
  }

  // UPDATE - PUT - Allow users to add a movie to their list of favorites
  public addFavorite(username: string, MovieID: string): Observable<any> {
    return this.http
      .put(
        `${this.apiUrl}/users/${username}/favorites/${MovieID}`,
        {},
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE - Allow users to remove a movie from their list of favorites
  public deleteFavorite(username: string, MovieID: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/users/${username}/favorites/${MovieID}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // UPDATE - PUT - Allow users to add movie to the "To Watch" list
  public addToWatch(username: string, MovieID: string): Observable<any> {
    return this.http
      .put(
        `${this.apiUrl}/users/${username}/toWatch/${MovieID}`,
        {},
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE - Allow users to remove a movie from their list of To Watch
  public deleteToWatch(username: string, MovieID: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/users/${username}/toWatch/${MovieID}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
