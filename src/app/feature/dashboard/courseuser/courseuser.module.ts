import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseuserComponent } from './courseuser.component';
import { TablacourseuserComponent } from './components/tablacourseuser/tablacourseuser.component';
import { SharedModule } from '../../../shared/shared.module';
import { CourseInfoDialogComponent } from '../../../shared/components/dialogo/courseinfodialog.component';



@NgModule({
  declarations: [
    CourseuserComponent,
    TablacourseuserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CourseInfoDialogComponent
  ],

  exports:[CourseuserComponent],

    providers:[
    { provide: 'Title', useValue: 'Courses' },
  ]
})
export class CourseuserModule { }
