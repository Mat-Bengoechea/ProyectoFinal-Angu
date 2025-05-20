import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseActions } from './course.actions';
import { CourseService } from '../../../../core/services/course.service';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  loadCourses$;
  constructor(private actions$: Actions, private courseservice: CourseService) {
    console.log('actions$', this.actions$);
    console.log('courseservice', this.courseservice);

    this.loadCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CourseActions.loadCourses),
        concatMap(() =>
          this.courseservice.getCourses().pipe(
            map((courses) => CourseActions.loadCoursesSuccess({ courses })),
            catchError((error) =>
              of(CourseActions.loadCoursesFailure({ error }))
            )
          )
        )
      )
    );
  }
}
