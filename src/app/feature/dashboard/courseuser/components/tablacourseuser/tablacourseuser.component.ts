import { Component, Inject, OnInit } from '@angular/core';
import { Course } from '../../../courses/interface/course';
import { CourseService } from '../../../../../core/services/course.service';
import { CourseInfoDialogComponent } from '../../../../../shared/components/dialogo/courseinfodialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCourses, selectCoursesError, selectCoursesLoading } from '../../../courses/store/course.selectors';
import { CourseActions } from '../../../courses/store/course.actions';
import { RootState } from '../../../../../core/services/store';

@Component({
  selector: 'app-tablacourseuser',
  standalone: false,
  templateUrl: './tablacourseuser.component.html',
  styleUrl: './tablacourseuser.component.scss'
})
export class TablacourseuserComponent implements OnInit {
    displayedColumns: string[] = ['title', 'description', 'time', 'actions'];
  dataSourceUser: Course[] = [];

    courses$: Observable<Course[]>;
    isLoading$: Observable<boolean>;
    error$: Observable<any>; 
  

  constructor(
    private courseService: CourseService,
    @Inject('Title') private title: string,
    private dialog: MatDialog,
    private store: Store<RootState>,
    
  ) {
        this.courses$ = this.store.select(selectCourses);
        this.isLoading$ = this.store.select(selectCoursesLoading);
        this.error$ = this.store.select(selectCoursesError);
    
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
    this.store.select(selectCourses).subscribe({
      next: (courses)=> {
        console.log('Courses from store:', courses);
        this.dataSourceUser = courses;
      },
      error: (error) =>{
        console.error('Error al obtener los cursos:', error);
      }
    })
  }

  openInfoDialog(course: Course) {
  this.dialog.open(CourseInfoDialogComponent, {
    data: course,
    width: '400px'
  });
}

}
