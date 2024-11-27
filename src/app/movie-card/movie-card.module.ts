// movie-card.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MovieCardComponent } from './movie-card.component';

// The @NgModule decorator configures your module
@NgModule({
  declarations: [
    MovieCardComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule
  ],
  exports: [
    MovieCardComponent
  ]
})
export class MovieCardModule { }
