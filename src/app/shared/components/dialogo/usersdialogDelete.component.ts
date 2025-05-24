import { Component } from '@angular/core';
import { MatDialogRef,} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-delete-users',
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
export class DialogDeleteusersComponent {
    Titles: string = 'Eliminar usuario';
    Content: string = '¿Está seguro de que desea eliminar este usuario?';

    constructor(private matDialogRef: MatDialogRef<DialogDeleteusersComponent>) {}

  submitForm(): void {
    this.matDialogRef.close(true);
  }
}
