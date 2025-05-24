import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TablacourseuserComponent } from './tablacourseuser.component';
import { CourseService } from '../../../../../core/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { Course } from '../../../courses/interface/course';
import { CourseActions } from '../../../courses/store/course.actions';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectCourses } from '../../../courses/store/course.selectors';

fdescribe('TablacourseuserComponent', () => {
  let component: TablacourseuserComponent;
  let fixture: ComponentFixture<TablacourseuserComponent>;
  let mockStore: any;
  let mockDialog: any;
  let coursesSubject: Subject<Course[]>;

  const mockCourses: Course[] = [
    { id: '1', title: 'Course 1', description: 'Desc 1', time: '1h' },
    { id: '2', title: 'Course 2', description: 'Desc 2', time: '2h' }
  ];

  beforeEach(waitForAsync(() => {
    coursesSubject = new Subject<Course[]>();

    mockStore = {
      select: jasmine.createSpy('select').and.callFake((selector: any) => {
        if (selector === selectCourses) {
          return coursesSubject.asObservable();
        }
        return of([]); 
      }),
      dispatch: jasmine.createSpy('dispatch')
    };

    mockDialog = {
      open: jasmine.createSpy('open')
    };

    TestBed.configureTestingModule({
      declarations: [TablacourseuserComponent],
      imports:[MatProgressSpinnerModule,SharedModule],
      providers: [
        { provide: CourseService, useValue: {} }, 
        { provide: MatDialog, useValue: mockDialog },
        { provide: Store, useValue: mockStore },
        { provide: 'Title', useValue: 'Mock Title' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TablacourseuserComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCourses on init and subscribe to courses', () => {
    fixture.detectChanges(); 

    expect(mockStore.dispatch).toHaveBeenCalledWith(CourseActions.loadCourses());

    
    coursesSubject.next(mockCourses);

    expect(component.dataSourceUser).toEqual(mockCourses);
  });

  it('should open dialog with course data on openInfoDialog call', () => {
    const course = mockCourses[0];
    component.openInfoDialog(course);
    expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: course,
      width: '400px'
    });
  });
});
