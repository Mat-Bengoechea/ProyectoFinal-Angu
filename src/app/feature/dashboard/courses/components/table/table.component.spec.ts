import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseService } from '../../../../../core/services/course.service';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    courseServiceSpy = jasmine.createSpyObj('CourseService', [
      'getCourses',
      'deleteCourse',
      'setUpdateCourse'
    ]);

    courseServiceSpy.getCourses.and.returnValue(of([
      { id: '1', title: 'Course 1', description: 'Description 1', time: '60' },
      { id: '2', title: 'Course 2', description: 'Description 2', time: '90' },
    ]));

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        provideMockStore({}),
        { provide: CourseService, useValue: courseServiceSpy },
        Title
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
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