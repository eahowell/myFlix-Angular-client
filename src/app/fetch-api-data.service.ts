/**
 * - Service for handling all API interactions for the MyFlix application.
 * - Provides methods for user authentication, movie data retrieval, and user preferences management.
 * - Includes built-in error handling and authentication header management.
 * @class FetchApiDataService
 */
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
  /** Base URL for the MyFlix API */
  private apiUrl = 'https://myflix-eahowell-7d843bf0554c.herokuapp.com';

  /**
   * @param {HttpClient} http - Angular's HttpClient for making HTTP requests
   * @param {StorageService} storageService - Service for managing local storage
   */
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  /**
   * Creates HTTP headers with authentication token and content type.
   * @returns {HttpHeaders} Headers with Bearer token and JSON content type
   */
  private getHeaders(): HttpHeaders {
    const token = this.storageService.getCurrentToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  /**
   * Extracts data from HTTP response.
   * @param {any} res - HTTP response
   * @returns {any} Response data or empty object
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Handles HTTP errors and transforms them into observable error messages.
   * @param {HttpErrorResponse} error - HTTP error response
   * @returns {Observable<never>} Observable that errors with formatted message
   */
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
  }

  /**
   * CREATE - POST - Allow new users to register;  (username, password, first name, last name, email, date of birth)
   * @param {any} userDetails - User registration details
   * @returns {Observable<any>} Observable with registration response
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/users`, userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * CREATE - POST - Allow users to login;  (using username and password)
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Observable<any>} Observable with login response including auth token
   */
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

  /**
   * READ - GET - Return a list of ALL movies to the user
   * @returns {Observable<any>} Observable with array of movies
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movies`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * READ - GET - Return data about a single movie by title to the user
   * @param {string} title - Movie title
   * @returns {Observable<any>} Observable with movie details
   */
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movies/${title}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * READ - GET - Return a list of ALL genres to the user
   * @returns {Observable<any>} Observable with array of all genres
   */
  public getAllGenres(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/genres`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * READ - GET - Return data about a genre (description) by name (e.g., “Thriller”)
   * @param {string} genreName - Name of the genre to retrieve
   * @returns {Observable<any>} Observable with genre details including description
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/genres/${genreName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * READ - GET - Return a list of ALL directors to the user
   * @returns {Observable<any>} Observable with array of all directors
   */
  public getAllDirectors(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/directors`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * READ - GET - Return data about a director (bio, birth year, death year) by name
   * @param {string} directorName - Name of the director to retrieve
   * @returns {Observable<any>} Observable with director details including bio and birth/death years
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/directors/${directorName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * READ - GET - Return the details of a specific to the user
   * @param {string} username - Username of the user to retrieve
   * @returns {Observable<any>} Observable with user profile details
   */
  public getUser(username: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/users/${username}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * UPDATE - PUT - Allow users to update their user info (email, first name, last name, and password)
   * - Only those fields can be updated because we don't want username, userID, and DOB to be changed
   * @param {any} userDetails - Updated user details
   * @returns {Observable<any>} Observable with updated user information
   */
  public updateUser(userDetails: any): Observable<any> {
    console.log({ ...userDetails });
    return this.http
      .put(`${this.apiUrl}/users/${userDetails.Username}`, userDetails, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * DELETE - Allow existing users to deregister (Delete account)
   * @param {string} username - Username of account to delete
   * @returns {Observable<any>} Observable with deletion confirmation
   */
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

  /**
   * UPDATE - PUT - Allow users to add a movie to their list of favorites
   * @param {string} username - User's username
   * @param {string} MovieID - ID of movie to add
   * @returns {Observable<any>} Observable with updated favorites list
   */
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

  /**
   * DELETE - Allow users to remove a movie to their list of favorites
   * @param {string} username - User's username
   * @param {string} MovieID - ID of movie to add
   * @returns {Observable<any>} Observable with updated favorites list
   */
  public deleteFavorite(username: string, MovieID: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/users/${username}/favorites/${MovieID}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * UPDATE - PUT - Allow users to add movie to the "To Watch" list
   * @param {string} username - User's username
   * @param {string} MovieID - ID of movie to add
   * @returns {Observable<any>} Observable with updated to watch list
   */
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

  /**
   * DELETE - Allow users to remove a movie from their list of To Watch
   * @param {string} username - User's username
   * @param {string} MovieID - ID of movie to add
   * @returns {Observable<any>} Observable with updated to watch list
   */
  public deleteToWatch(username: string, MovieID: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/users/${username}/toWatch/${MovieID}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
