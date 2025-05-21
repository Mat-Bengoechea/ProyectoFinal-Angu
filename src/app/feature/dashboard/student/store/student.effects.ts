import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentService } from '../../../../core/services/student.service';

@Injectable()
export class StudentEffects {
  constructor(
    private actions$: Actions,
    private studentservice: StudentService
  ) {}
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.studentservice.getStudentListobs().pipe(
          map((students) => StudentActions.loadStudentsSuccess({ students })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    )
  );
}
