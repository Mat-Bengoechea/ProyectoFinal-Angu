import { Component } from '@angular/core';
import { MatDialogRef,} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-delete',
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
export class DialogDeleteComponent {
    Titles: string = 'Eliminar curso';
    Content: string = '¿Está seguro de que desea eliminar este curso?';

    constructor(private matDialogRef: MatDialogRef<DialogDeleteComponent>) {}

  submitForm(): void {
    this.matDialogRef.close(true);
  }
}
