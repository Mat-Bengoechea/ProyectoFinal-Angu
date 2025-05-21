import { Component, Inject, OnInit } from '@angular/core';
import { Course } from '../../interface/course';
import { CourseService } from '../../../../../core/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/services/store';
import { Observable } from 'rxjs';
import { selectCourses, selectCoursesError, selectCoursesLoading } from '../../store/course.selectors';
import { CourseActions } from '../../store/course.actions';
import { DialogDeleteComponent } from '../../../../../shared/components/dialogo/dialogoDelete.component';


@Component({
  selector: 'course-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'time', 'actions'];
  dataSource: Course[] = [];

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
        this.dataSource = courses;
      },
      error: (error) =>{
        console.error('Error al obtener los cursos:', error);
      }
    })
  }

  deleteCourse(id: string) {
this.dialog
.open(DialogDeleteComponent).afterClosed()
.subscribe({
  next: (confirmed: boolean) => {
    if (confirmed) {
      this.store.dispatch(CourseActions.deleteCourse({ id }));
    }
  }
})
  }

  editCourse(id: string) {
    this.courseService.setUpdateCourse(id);
        this.dialog.open(FormComponent, {
          width: '500px',
          height: 'auto',
          disableClose: false,
        });
  }
}
