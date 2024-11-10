// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username:'',
    Password: '',
    Email: '',
    Birthday: '',
    FirstName: '',
    LastName: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) {}

    ngOnInit(): void {

    }

    registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((repsonse) => {
        // Successful user registration
        this.dialogRef.close(); // Close on success
        console.log(repsonse);
        this.snackBar.open('User successfully registered!', 'OK',{
          duration: 2000
        });
      }, (repsonse)=>{
        console.log(repsonse);
        this.snackBar.open(repsonse, 'OK', {
          duration: 2000
        });
      });
    }

}
