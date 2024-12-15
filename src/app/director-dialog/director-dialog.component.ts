/**
 * Component for displaying detailed information about a movie's director in a dialog.
 * Renders the director's name, biography, birth date, and death date (if applicable).
 * This component is typically opened as a modal dialog when users want to learn more
 * about a movie's director.
 */
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.scss'
})
export class DirectorDialogComponent implements OnInit {
  @Input() movie={
    _id: '',
    Title: '',
    Description: '',
    ImagePath: '',
    Genre: {Name: '', Description: ''},
    Director: {Name: '', Bio: '', Birthday: '', Death_day: '', },
  };

 /**
   * Creates an instance of DirectorDialogComponent.
   * Initializes the movie object with data passed through the dialog.
   * @param {FetchApiDataService} fetchApiData - Service for making API calls
   * @param {MatDialogRef<DirectorDialogComponent>} dialogRef - Reference to the dialog containing this component
   * @param {any} data - Data passed to the dialog, containing movie information
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DirectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {

  }


}

