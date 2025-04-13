import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FormComponent,
    TableComponent
  ]
})
export class StudentModule { }
