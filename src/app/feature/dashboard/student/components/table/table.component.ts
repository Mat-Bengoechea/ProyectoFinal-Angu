import { Component, OnInit } from '@angular/core';
import { Student } from '../../interface/interface';
import { StudentService } from '../../../../../core/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { filter, Observable } from 'rxjs';
import { selectStudents, selectStudentsError, selectStudentsLoading, selectStudentToEdit } from '../../store/student.selectors';
import { RootState } from '../../../../../core/services/store';
import { Store } from '@ngrx/store';
import { StudentActions } from '../../store/student.actions';
import { DialogDeleteStudentComponent } from '../../../../../shared/components/dialogo/dialogoDeleteStudent.component';

@Component({
  selector: 'student-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['nombrecompleto', 'email', 'edad', 'curso', 'actions'];
  TableStudent: Student[] = [];
  dataSource: Student[] = [];

   students$: Observable<Student[]>;
    isLoading$: Observable<boolean>;
    error$: Observable<any>; 

  constructor(private studenlistservice: StudentService,
    private dialog: MatDialog,
    private store: Store<RootState>,
  ) {
    this.students$ = this.store.select(selectStudents);
    this.isLoading$ = this.store.select(selectStudentsLoading);
    this.error$ = this.store.select(selectStudentsError);
  }
  
  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents());
    this.store.select(selectStudents).subscribe({
      next: (students)=> {
        console.log('Students from store:', students);
        this.TableStudent = students;
      },
      error: (error) =>{
        console.error('Error al obtener los estudiantes:', error);
      }
    })
  }

  
  editStudent(id: string) {
  this.store.dispatch(StudentActions.setStudentToEdit({id}));

  const sub = this.store.select(selectStudentToEdit).pipe(
    filter(student => !!student),
  ).subscribe(student =>{
    const dialogRef = this.dialog.open(FormComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(()=>
    this.store.dispatch(StudentActions.clearStudentToEdit()));
  });
    }

    deleteStudent(id : string) {
      this.dialog
      .open(DialogDeleteStudentComponent)
      .afterClosed()
      .subscribe({
        next:(confirmed: boolean) => {
        if (confirmed){
          this.store.dispatch(StudentActions.deleteStudent({id}));
        }         
        },
      });
   }
}
