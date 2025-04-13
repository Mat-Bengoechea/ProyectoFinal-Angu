import { Component } from '@angular/core';
import { validarApellido, validarnombre, validateEmail } from './shared/utils/validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './student/interface/interface';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './student/components/form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
openDialog(arg0: string,arg1: string) {
throw new Error('Method not implemented.');
}

  title = 'ProjectoFinal';

  showFiller = false;

  constructor(private dialog: MatDialog) { }

  openFormDialog(): void {
    this.dialog.open(FormComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
    });
  }
  
  
}
