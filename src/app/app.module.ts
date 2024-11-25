import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

// Application Modules and Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

// Services
import { UserStateService } from './user-state.service';
import { StorageService } from './local-storage.service';
import { FetchApiDataService } from './fetch-api-data.service';
import { AllMoviesPageComponent } from './all-movies-page/all-movies-page.component';
import { GenreDialogComponent } from './genre-dialog/genre-dialog.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: AllMoviesPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    LoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    AllMoviesPageComponent,
    GenreDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToolbarComponent,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    UserStateService,
    StorageService,
    FetchApiDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
