import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { DetailsComponent } from './pages/details/details.component';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from '../../../shared/shared.module';
import { DialogcourseComponent } from '../../../shared/components/dialogo/dialogocourse.component';




@NgModule({
  declarations: [
    CoursesComponent,
    DetailsComponent,
    FormComponent,
    TableComponent,
    DialogcourseComponent
  ],
  imports: [
    CommonModule, SharedModule,
  ],
  exports:[
CoursesComponent,
  ],

  providers:[
    { provide: 'Title', useValue: 'Courses' },
  ]
})
export class CoursesModule { }
