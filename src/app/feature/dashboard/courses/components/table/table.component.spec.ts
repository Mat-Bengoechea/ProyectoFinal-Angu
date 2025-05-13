import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { CourseService } from '../../../../../core/services/course.service';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../../../../../shared/shared.module';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
        const courseServiceMock = jasmine.createSpyObj('CourseService', [
      'getCourses',
      'deleteCourse',
      'setUpdateCourse',
    ]);
    courseServiceMock.courses$ = of([
      { id: '1', title: 'Course 1', description: 'Description 1', time: '60' },
      { id: '2', title: 'Course 2', description: 'Description 2', time: '90' },
    ]);
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TableComponent],
      providers: [{ provide: CourseService, useValue: courseServiceMock },
        { provide: 'Title', useValue: 'Test Title' }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    courseServiceSpy = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should call getCourses on init', () => {
    expect(courseServiceSpy.getCourses).toHaveBeenCalled();
  });

 it('should populate dataSource with courses from courses$', () => {
    expect(component.dataSource).toEqual([
      { id: '1', title: 'Course 1', description: 'Description 1', time: '60' },
      { id: '2', title: 'Course 2', description: 'Description 2', time: '90' },
    ]);
  });

  it('should call deleteCourse with the correct id', () => {
    component.deleteCourse('1');
    expect(courseServiceSpy.deleteCourse).toHaveBeenCalledWith('1');
  });

 it('should call setUpdateCourse with the correct id', () => {
    component.editCourse('2');
    expect(courseServiceSpy.setUpdateCourse).toHaveBeenCalledWith('2');
  });
});
