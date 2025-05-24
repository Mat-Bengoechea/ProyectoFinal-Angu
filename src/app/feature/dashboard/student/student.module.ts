import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentComponent } from './student.component';
import { StoreModule } from '@ngrx/store';
import { studentsFeature } from './store/student.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import { DialogDeleteStudentComponent } from '../../../shared/components/dialogo/dialogoDeleteStudent.component';



@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    StudentComponent,
    DialogDeleteStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    StoreModule.forFeature(studentsFeature),
    EffectsModule.forFeature([StudentEffects])
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
