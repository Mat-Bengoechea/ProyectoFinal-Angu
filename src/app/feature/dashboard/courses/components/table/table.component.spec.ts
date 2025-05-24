import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseService } from '../../../../../core/services/course.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CourseActions } from '../../store/course.actions';
import { FormComponent } from '../form/form.component';
import { DialogDeleteComponent } from '../../../../../shared/components/dialogo/dialogoDelete.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../../../shared/shared.module';
import { selectCourses, selectCoursesError, selectCoursesLoading, selectCourseToEdit } from '../../store/course.selectors';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let store: MockStore;

  const mockCourses = [
    { id: '1', title: 'Course 1', description: 'Description 1', time: '60' },
    { id: '2', title: 'Course 2', description: 'Description 2', time: '90' },
  ];

  beforeEach(async () => {
    courseServiceSpy = jasmine.createSpyObj('CourseService', [
      'getCourses',
      'deleteCourse'
    ]);

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports:[MatButtonModule,MatDialogModule,MatTableModule,MatIconModule,SharedModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectCourses, value: mockCourses },
            { selector: selectCoursesLoading, value: false },
            { selector: selectCoursesError, value: null },
            { selector: selectCourseToEdit, value: mockCourses[1] }
          ]
        }),
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: 'Title', useValue: 'Cursos' }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCourses on init and set dataSource', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(CourseActions.loadCourses());
    expect(component.dataSource).toEqual(mockCourses);
  });

  it('should dispatch deleteCourse after confirmation', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.deleteCourse('1');

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogDeleteComponent);
    expect(dispatchSpy).toHaveBeenCalledWith(CourseActions.deleteCourse({ id: '1' }));
  });

  it('should dispatch setCourseToEdit and open FormComponent dialog', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.editCourse('2');

    expect(dispatchSpy).toHaveBeenCalledWith(CourseActions.setCourseToEdit({ id: '2' }));
    expect(dialogSpy.open).toHaveBeenCalledWith(FormComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
    });
  });
});
