import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentComponent } from './student.component';
import { DialogComponent } from '../../../shared/components/dialogo/dialogo.component';



@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    StudentComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
  ],
  exports: [
    StudentComponent
  ],

  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class StudentModule {
 }
