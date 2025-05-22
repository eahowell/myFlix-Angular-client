![myFlix Logo](public/myFlixLogo-brand.png)
# Welcome to the myFlix Client (Angular)
![GitHub issues](https://img.shields.io/github/issues/eahowell/myFlix-Angular-client?color=yellow)
![GitHub Repo stars](https://img.shields.io/github/stars/eahowell/myFlix-Angular-client)
![GitHub forks](https://img.shields.io/github/forks/eahowell/myFlix-Angular-client)
![GitHub watchers](https://img.shields.io/github/watchers/eahowell/myFlix-Angular-client)

## 📖 Overview
The client side of the myFlix app using Angular that's using the server-side [movie_api](https://github.com/eahowell/movie_api) (REST API and Database).  
myFlix is a full-stack (MEAN: MongoDB, Express, Angular, Node.js) single-page web application that serves as a movie database. Users can browse a curated list of movies with detailed information including descriptions, directors, and genre details. Registered users can create a profile, manage their account, and add movies to their favorites and watch lists.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.


## 📎 Table of Contents
- [Welcome to the myFlix Client (Angular)](#welcome-to-the-myflix-client-angular)
  - [📖 Overview](#-overview)
  - [📎 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [📺 Demo](#-demo)
  - [✅ Technical Requirements](#-technical-requirements)
  - [🏎️ Getting Started](#️-getting-started)
    - [Prerequisites](#prerequisites)
  - [🔧 Installation](#-installation)
      - [Code scaffolding](#code-scaffolding)
      - [Build](#build)
      - [Running unit tests](#running-unit-tests)
      - [Running end-to-end tests](#running-end-to-end-tests)
      - [Further help](#further-help)
  - [🔗 API Endpoints](#-api-endpoints)
  - [🪙 Authentication](#-authentication)
  - [📂 Folder Structure](#-folder-structure)
  - [🗄️ Database](#️-database)
  - [🤝 Contributing](#-contributing)
  - [🪪 License](#-license)
  - [✉️ Contact](#️-contact)
  - [](#)

## 🚀 Features
- Your app should display a welcome view where users will be able to either log in or register an
account.
- Once authenticated, the user should now view all movies.
- Upon clicking on a particular movie, users will be taken to a single movie view, where
additional movie details will be displayed. The single movie view will contain the following
additional features:
  - A button that when clicked takes a user to the director view, where details about the
director of that particular movie will be displayed.
  - A button that when clicked takes a user to the genre view, where details about that
particular genre of the movie will be displayed.

[🔝](#welcome-to-the-myflix-client-angular)
## 📺 Demo

- [Live myFlix Site](https://eahowell.github.io/myFlix-Angular-client/welcome)

  Test account:
    ```
    Username: testportfolio
    Password: 12345678 
    ```

[🔝](#welcome-to-the-myflix-client-angular)
## ✅ Technical Requirements
The project technical requirements include:
- The application must be written in Angular (version 9 or later)
- The application requires the latest version of Node.js and npm package
- The application must contain user registration and login forms
- The application must be designed using Angular Material
- The application's codebase must contain comments using Typedoc
- The project must contain technical documentation using JSDoc
- The project must be hosted on GitHub Pages  
  
[🔝](#welcome-to-the-myflix-client-angular)
## 🏎️ Getting Started

### Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher) 
  
[🔝](#welcome-to-the-myflix-client-angular)  
## 🔧 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/eahowell/myFlix-Angular-client.git
   cd myFlix-Angular-client
2. Install dependencies:
    ```bash 
    npm install
3. Start the development server:
    ```bash 
    ng serve
4. Open your browser and navigate to http://localhost:4200 (or the port specified in your terminal)
  
[🔝](#welcome-to-the-myflix-client-angular)
## ⛓️ Dependencies

### Core Dependencies
- @angular/animations: ^18.2.0
- @angular/cdk: ^18.2.12
- @angular/common: ^18.2.0
- @angular/compiler: ^18.2.0
- @angular/core: ^18.2.0
- @angular/forms: ^18.2.0",
- @angular/material: ^18.2.12
- @angular/material-moment-adapter: ^18.2.13
- @angular/platform-browser: ^18.2.0
- @angular/platform-browser-dynamic: ^18.2.0
- @angular/platform-server: ^18.2.0
- @angular/router: ^18.2.0
- @angular/ssr: ^18.2.9
- express: ^4.18.2
- moment: ^2.30.1
- ng: ^0.0.0
- rxjs: ~7.8.0
- tslib: ^2.3.0
- zone.js: ~0.14.10  

### Dev Dependencies
- @angular-devkit/build-angular: ^18.2.9
- @angular/cli: ^18.2.9
- @angular/compiler-cli: ^18.2.0
- @types/express: ^4.17.17
- @types/jasmine: ~5.1.0
- @types/node: ^18.18.0
- angular-cli-ghpages: ^2.0.3
- jasmine-core: ~5.2.0
- json-to-scss: ^1.6.2
- karma: ~6.4.0
- karma-chrome-launcher: ~3.2.0
- karma-coverage: ~2.2.0
- karma-jasmine: ~5.1.0
- karma-jasmine-html-reporter: ~2.1.0
- sass: ^1.80.6
- typedoc: ^0.27.4
- typescript: ~5.5.2

[🔝](#welcome-to-the-myflix-client-angular)
## 📚 User Stories

<table>
<tr>
<td width="50%" valign="top">

### 1. Movie Information Access
Users can access information about movies, directors, and genres.

#### Navigation Features
##### Logged-in Users
- Movies Button → Movie List
- User Profile Button → User Profile
- Logout Button with redirect to Login
- Logged-in user indicator
- Brand Logo → Homepage

##### Non-logged Users
- Brand Logo → Homepage
- Login Button → Login View
- Sign-Up Button → Sign-Up View

#### Core Views
##### Homepage
- App Title
- Navigation Toolbar
- Login/Sign-Up buttons

##### Movie List (Authenticated)
- Search functionality (Optional Feature)
- Genre/Director filters
- Movie Cards display

##### Movie Card (Authenticated)
- Movie poster
- Title and Director
- Details button → Movie View
- Add to Favorites button

##### Movie Details (Authenticated)
- Movie poster
- Full details (Title, Director, Genre, Cast, Description)
- Navigation to Director/Genre views

##### Director/Genre Details
- Director: Bio, Birth/Death dates
- Genre: Name and Description
- Return navigation
</td>
<td width="50%" valign="top">

### 2. User Profile Management
Users can create a profile to save data about their favorite movies

#### Authentication Views
##### Login
- Username/Password fields
- Sign in with API authentication
- Sign-Up redirect
- Password reset
- Form validation

##### Sign-Up
- Required fields:
  - Username
  - Password + confirmation
  - Email
  - Birthday
  - First/Last Name
- Register with API integration
- Form validation

#### Profile Features (Authenticated)
- User Information management
- Form validation
- Favorite Movies List with Movie Cards

</td>
</tr>
</table>

[🔝](#welcome-to-the-myflix-client-angular)
## 📲 App Wireflow
### Main Flows
- **Home**: Browse all movies  
- **Sign Up**: Create an account  
- **Login**: Access profile  
- **Movie Details**: View full info  
- **Profile**: Manage favorites & to-watch list  
  
![myFlix Angular Wireflow](public/wireflow.png)

 
[🔝](#welcome-to-the-myflix-client-angular) 
## 📦 Scripts

| Command     | Description                            |
| ----------- | -------------------------------------- |
| `ng serve`  | Starts dev server                      |
| `ng build`  | Creates a production bundle in `dist/` |
| `ng test`   | Executes the unit tests with Karma     |
| `ng deploy` | Deploys the app                        |


  
[🔝](#welcome-to-the-myflix-client-angular)
#### Development server

- Run `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`. 
- The application will automatically reload if you change any of the source files.  
*Note:* Seeing movies and creating favorites require login, you can sign up and create a profile or you can use the test profile:
```bash
Username: testportfolio
Password: 12345678
```

#### Code scaffolding

- Run `ng generate component component-name` to generate a new component. 
- You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

- Run `ng build` to build the project. 
- The build artifacts will be stored in the `dist/` directory.

#### Running unit tests

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

- Run `ng e2e` to execute the end-to-end tests via a platform of your choice. 
- To use this command, you need to first add a package that implements end-to-end testing capabilities.

#### Further help

- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
 
[🔝](#welcome-to-the-myflix-client-angular)
## 🔗 API Endpoints
The client communicates with the [myFlix API](https://github.com/eahowell/movie_api) hosted on Heroku. Key endpoints include:
  - <summary><code>GET</code> <code><b>/movies</b></code> <code>Retrieve all movies</code></summary>
  - <summary><code>GET</code> <code><b>/movies/:movieId</b></code> <code>Get a specific movie by ID</code></summary>
  - <summary><code>GET</code> <code><b>/users/:Username</b></code> <code>Get user information</code></summary>
  - <summary><code>POST</code> <code><b>/users</b></code> <code>Register a new user</code></summary>
  - <summary><code>PUT</code> <code><b>/users/:Username</b></code> <code>Update user information</code></summary>
  - <summary><code>PUT</code> <code><b>/users/:Username/favorites/:MovieID</b></code> <code>Add a movie to favorites</code></summary>
  - <summary><code>DELETE</code> <code><b>/users/:Username/favorites/:MovieID</b></code> <code>Remove a movie from favorites</code></summary>
  - <summary><code>PUT</code> <code><b>/users/:Username/toWatch/:MovieID</b></code> <code>Add a movie to watch list</code></summary>
  - <summary><code>DELETE</code> <code><b>/users/:Username/toWatch/:MovieID</b></code> <code>Remove a movie from watch list</code></summary>

_For a complete list of endpoints and documentation, visit the [API Repository](https://github.com/eahowell/movie_api)._

[🔝](#welcome-to-the-myflix-client-angular)  
## 🪙 Authentication

JWTs are stored in `localStorage`.  
Send as header:  
`Authorization: Bearer <token>`   

[🔝](#welcome-to-the-myflix-client-angular) 
## 📂 Folder Structure
```text
myFlix-Angular-client/
├── e2e/  
│   ├── src/  
│   └── protractor.conf.js  
├── node_modules/  
├── public/  
│   ├── myFlixLogo-brand.png  
│   └── wireflow.png  
├── src/  
│   ├── app/  
│   │   ├── components/  
│   │   │   ├── movie-card/  
│   │   │   │   ├── movie-card.component.ts  
│   │   │   │   ├── movie-card.component.html  
│   │   │   │   └── movie-card.component.scss  
│   │   │   ├── movie-view/  
│   │   │   ├── director-view/  
│   │   │   └── genre-view/  
│   │   ├── services/  
│   │   │   └── fetch-api-data.service.ts  
│   │   ├── models/  
│   │   │   └── movie.ts  
│   │   ├── app-routing.module.ts  
│   │   ├── app.component.ts  
│   │   └── app.module.ts  
│   ├── assets/  
│   ├── environments/  
│   │   ├── environment.ts  
│   │   └── environment.prod.ts  
│   ├── index.html  
│   ├── main.ts  
│   ├── polyfills.ts  
│   ├── styles.scss  
│   └── test.ts  
├── .gitignore  
├── angular.json  
├── karma.conf.js  
├── package.json  
├── tsconfig.json  
└── README.md
```

[🔝](#welcome-to-the-myflix-client-angular)
## 🗄️ Database
- myFlixDB is stored in MongoDB
- Collections include:
  - Users
  - Movies
  - Genres
  - Directors
  - Actors

  
[🔝](#welcome-to-the-myflix-client-angular)
## 🤝 Contributing
1. Fork the repo  
2. Create a feature branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m "Add some feature"`  
4. Push to branch: `git push origin feature/your-feature-name`  
5. Open a pull request  
  
[🔝](#welcome-to-the-myflix-client-angular)
## 🪪 License
- API uses ISC
- Angular uses MIT https://angular.dev/license
- RxJS uses Apache-2.0 http://www.apache.org/licenses/
- tslib uses 0BSD  
  
[🔝](#welcome-to-the-myflix-client-angular)
## ✉️ Contact

**Developer:** [Elizabeth Howell](ehowell.webdev@gmail.com)  
**Website:** [Portfolio](http://ehowell-dev.me/PortfolioWebsite/)  
**Twitter:** [ehowell_webdev](https://x.com/ehowell_webdev)  
**GitHub:** [eahowell](https://github.com/eahowell)
  
[🔝](#welcome-to-the-myflix-client-angular)
##
Thank you for checking out myFlix! This application was developed as part of the Career Foundry Full-Stack Web Development Course to demonstrate skills in full-stack development, RESTful API design, authentication, and dynamic frontend rendering.
  
[🔝](#welcome-to-the-myflix-client-angular)
