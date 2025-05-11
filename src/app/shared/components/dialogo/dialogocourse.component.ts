import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-dialog',
  standalone: false,
  template: `
  <section class="dialogo-confirm">
    <h1 mat-dialog-title>{{Titles}}</h1>
    <div mat-dialog-content>{{Content}}</div>
    <div mat-dialog-actions>
      <button mat-flat-button mat-dialog-close>No</button>
      <button mat-flat-button (click)="submitForm()">Si</button>
    </div>
  </section>
  `,
})
export class DialogcourseComponent {
  
    Titles: string = 'Agregar curso';
    Content: string = '¿Estás seguro de agregar este curso?';

    constructor(private matDialogRef: MatDialogRef<DialogcourseComponent>) {}

  submitForm(): void {
    this.matDialogRef.close(true);
  }
}
