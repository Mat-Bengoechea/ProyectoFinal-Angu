import { Injectable, Pipe } from '@angular/core';
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

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      concatMap((action) =>
        this.studentservice.addStudentListobs(action.student).pipe(
          map((student) => StudentActions.addStudentSuccess({ student })),
          catchError((error) => of(StudentActions.addStudentFailure({ error })))
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      concatMap(({ id }) =>
        this.studentservice.deleteStudent(id).pipe(
          map(() => StudentActions.deleteStudentSuccess({ id: id })),
          catchError((error) =>
            of(StudentActions.deleteStudentFailure({ error }))
          )
        )
      )
    )
  );

  updateStudent$ = createEffect(()=>
  this.actions$.pipe(
    ofType(StudentActions.updateStudent),
    concatMap(({student})=>
    this.studentservice.updateStudent(student).pipe(
      map((updatedStudent)=>
      StudentActions.updateStudentSuccess({student: updatedStudent})),
      catchError((error)=>
      of(StudentActions.updateStudentFailure({error})))
    ))
  ));

  setStudentToEdit$ = createEffect(()=>
  this.actions$.pipe(
    ofType(StudentActions.setStudentToEdit),
    concatMap(({id})=>
    this.studentservice.getStudentById(id).pipe(
      map((student)=>
      StudentActions.setStudentToEditSuccess({student})),
      catchError((error)=>
      of(StudentActions.setStudentToEditFailure({error})))
    ))
  ))
}
