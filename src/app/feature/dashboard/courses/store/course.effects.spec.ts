import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CourseEffects } from './course.effects';
import { CourseService } from '../../../../core/services/course.service';
import { CourseActions } from './course.actions';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { Course } from '../interface/course';

describe('CourseEffects', () => {
  let actions$: Observable<Action>;
  let effects: CourseEffects;
  let courseService: jasmine.SpyObj<CourseService>;

  const mockCourse: Course = {
    id: '1',
    title: 'Test Course',
    description: 'Test Desc',
    time: '90',
  };

  beforeEach(() => {
    const courseServiceSpy = jasmine.createSpyObj('CourseService', [
      'getCourses',
      'addCourse',
      'deleteCourse',
      'updateCourse',
      'getCourseById',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        { provide: CourseService, useValue: courseServiceSpy },
      ],
    });

    effects = TestBed.inject(CourseEffects);
    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
  });

  describe('loadCourses$', () => {
    it('should return loadCoursesSuccess on success', () => {
      const courses = [mockCourse];
      const action = CourseActions.loadCourses();
      const outcome = CourseActions.loadCoursesSuccess({ courses });

      actions$ = hot('-a', { a: action });
      courseService.getCourses.and.returnValue(cold('-b|', { b: courses }));

      const expected = cold('--c', { c: outcome });

      expect(effects.loadCourses$).toBeObservable(expected);
    });

    it('should return loadCoursesFailure on error', () => {
      const error = 'error';
      const action = CourseActions.loadCourses();
      const outcome = CourseActions.loadCoursesFailure({ error });

      actions$ = hot('-a', { a: action });
      courseService.getCourses.and.returnValue(cold('-#|', {}, error));

      const expected = cold('--c', { c: outcome });

      expect(effects.loadCourses$).toBeObservable(expected);
    });
  });

  describe('addCourse$', () => {
    it('should return addCourseSuccess on success', () => {
      const action = CourseActions.addCourse({ course: mockCourse });
      const outcome = CourseActions.addCourseSuccess({ course: mockCourse });

      actions$ = hot('-a', { a: action });
      courseService.addCourse.and.returnValue(cold('-b|', { b: mockCourse }));

      const expected = cold('--c', { c: outcome });

      expect(effects.addCourse$).toBeObservable(expected);
    });

    it('should return addCourseFailure on error', () => {
      const error = 'error';
      const action = CourseActions.addCourse({ course: mockCourse });
      const outcome = CourseActions.addCourseFailure({ error });

      actions$ = hot('-a', { a: action });
      courseService.addCourse.and.returnValue(cold('-#|', {}, error));

      const expected = cold('--c', { c: outcome });

      expect(effects.addCourse$).toBeObservable(expected);
    });
  });

  describe('deleteCourse$', () => {
    it('should return deleteCourseSuccess on success', () => {
      const action = CourseActions.deleteCourse({ id: '1' });
      const outcome = CourseActions.deleteCourseSuccess({ id: '1' });

      actions$ = hot('-a', { a: action });
      courseService.deleteCourse.and.returnValue(cold('-b|', { b: {} }));

      const expected = cold('--c', { c: outcome });

      expect(effects.deleteCourse$).toBeObservable(expected);
    });

    it('should return deleteCourseFailure on error', () => {
      const error = 'error';
      const action = CourseActions.deleteCourse({ id: '1' });
      const outcome = CourseActions.deleteCourseFailure({ error });

      actions$ = hot('-a', { a: action });
      courseService.deleteCourse.and.returnValue(cold('-#|', {}, error));

      const expected = cold('--c', { c: outcome });

      expect(effects.deleteCourse$).toBeObservable(expected);
    });
  });

  describe('updateCourse$', () => {
    it('should return updateCourseSuccess on success', () => {
      const action = CourseActions.updateCourse({ course: mockCourse });
      const outcome = CourseActions.updateCourseSuccess({ course: mockCourse });

      actions$ = hot('-a', { a: action });
      courseService.updateCourse.and.returnValue(cold('-b|', { b: mockCourse }));

      const expected = cold('--c', { c: outcome });

      expect(effects.updateCourse$).toBeObservable(expected);
    });

    it('should return updateCourseFailure on error', () => {
      const error = 'error';
      const action = CourseActions.updateCourse({ course: mockCourse });
      const outcome = CourseActions.updateCourseFailure({ error });

      actions$ = hot('-a', { a: action });
      courseService.updateCourse.and.returnValue(cold('-#|', {}, error));

      const expected = cold('--c', { c: outcome });

      expect(effects.updateCourse$).toBeObservable(expected);
    });
  });

  describe('setCourseToEdit$', () => {
    it('should return setCourseToEditSuccess on success', () => {
      const action = CourseActions.setCourseToEdit({ id: '1' });
      const outcome = CourseActions.setCourseToEditSuccess({ course: mockCourse });

      actions$ = hot('-a', { a: action });
      courseService.getCourseById.and.returnValue(cold('-b|', { b: mockCourse }));

      const expected = cold('--c', { c: outcome });

      expect(effects.setCourseToEdit$).toBeObservable(expected);
    });

    it('should return setCourseToEditFailure on error', () => {
      const error = 'error';
      const action = CourseActions.setCourseToEdit({ id: '1' });
      const outcome = CourseActions.setCourseToEditFailure({ error });

      actions$ = hot('-a', { a: action });
      courseService.getCourseById.and.returnValue(cold('-#|', {}, error));

      const expected = cold('--c', { c: outcome });

      expect(effects.setCourseToEdit$).toBeObservable(expected);
    });
  });
});
