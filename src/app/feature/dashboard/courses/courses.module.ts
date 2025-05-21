import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { DetailsComponent } from './pages/details/details.component';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from '../../../shared/shared.module';
import { DialogcourseComponent } from '../../../shared/components/dialogo/dialogocourse.component';
import { StoreModule } from '@ngrx/store';
import { CourseFeature } from './store/course.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { DialogDeleteComponent } from '../../../shared/components/dialogo/dialogoDelete.component';




@NgModule({
  declarations: [
    CoursesComponent,
    DetailsComponent,
    FormComponent,
    TableComponent,
    DialogcourseComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule, SharedModule,
    StoreModule.forFeature(CourseFeature),
    EffectsModule.forFeature([CourseEffects]),
  ],
  exports:[
CoursesComponent,
  ],

  providers:[
    { provide: 'Title', useValue: 'Courses' }  ]
})
export class CoursesModule { }
