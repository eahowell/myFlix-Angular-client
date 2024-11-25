import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrl: './synopsis-dialog.component.scss'
})
export class SynopsisDialogComponent implements OnInit {
  @Input() movie={
    _id: '',
    Title: '',
    Description: '',
    ImagePath: '',
    Genre: {Name: '', Description: ''},
    Director: {Name: '', Bio: '', Birthday: '', Death_day: '', },
  };
  moviesInSameGenre: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SynopsisDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {

  }


}

