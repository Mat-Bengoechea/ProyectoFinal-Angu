import { Component } from '@angular/core';
import { MatDialogRef,} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  standalone: false,
  template: `
    <h1 mat-dialog-title>{{Titles}}</h1>
    <div mat-dialog-content>{{Content}}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button (click)="submitForm()">Si</button>
    </div>
  `,
})
export class DialogComponent {
    Titles: string = 'Enviar formulario';
    Content: string = '¿Está seguro de que desea enviar el formulario?';

    constructor(private matDialogRef: MatDialogRef<DialogComponent>) {}

  submitForm(): void {
    this.matDialogRef.close(true);
  }
}
