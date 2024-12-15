/**
 * - Component for displaying a movie's synopsis in a dialog format.
 * - Shows detailed movie information including title, description, and related metadata.
 * - This component is typically opened as a modal dialog when users want to read more about a specific movie's plot and details.
 */
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrl: './synopsis-dialog.component.scss'
})
export class SynopsisDialogComponent implements OnInit {
  /** Input property containing detailed movie information. */
  @Input() movie={
    _id: '',
    Title: '',
    Description: '',
    ImagePath: '',
    Genre: {Name: '', Description: ''},
    Director: {Name: '', Bio: '', Birthday: '', Death_day: '', },
  };

   /**
   * - Creates an instance of SynopsisDialogComponent.
   * - Initializes the movie object with data passed through the dialog.
   * @param {FetchApiDataService} fetchApiData - Service for making API calls
   * @param {MatDialogRef<SynopsisDialogComponent>} dialogRef - Reference to the dialog containing this component
   * @param {any} data - Data passed to the dialog, containing movie information
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SynopsisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {}


}

