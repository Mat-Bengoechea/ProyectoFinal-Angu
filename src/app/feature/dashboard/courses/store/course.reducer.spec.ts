import { reducer, initialState, CoursesState } from './course.reducer';
import { CourseActions } from './course.actions';
import { Course } from '../interface/course';

describe('Course Reducer', () => {
  const mockCourse: Course = {
    id: '1',
    title: 'Angular Avanzado',
    description: 'Curso avanzado de Angular',
    time: '90'
  };

  const updatedCourse: Course = {
    ...mockCourse,
    title: 'Angular Actualizado',
  };

  it('should return the initial state', () => {
    const action = { type: 'Unknown' } as any;
    const state = reducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should set isLoading true on loadCourses', () => {
    const action = CourseActions.loadCourses();
    const state = reducer(initialState, action);
    expect(state.isLoading).toBeTrue();
  });

  it('should populate courses and set isLoading false on loadCoursesSuccess', () => {
    const action = CourseActions.loadCoursesSuccess({ courses: [mockCourse] });
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state.courses).toEqual([mockCourse]);
    expect(state.isLoading).toBeFalse();
  });

  it('should set error and isLoading false on loadCoursesFailure', () => {
    const error = 'Error loading';
    const action = CourseActions.loadCoursesFailure({ error });
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state.error).toBe(error);
    expect(state.isLoading).toBeFalse();
  });

  it('should add course on addCourseSuccess', () => {
    const action = CourseActions.addCourseSuccess({ course: mockCourse });
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state.courses.length).toBe(1);
    expect(state.courses[0]).toEqual(mockCourse);
    expect(state.isLoading).toBeFalse();
  });

  it('should delete course on deleteCourseSuccess', () => {
    const stateBefore: CoursesState = {
      ...initialState,
      courses: [mockCourse],
    };
    const action = CourseActions.deleteCourseSuccess({ id: '1' });
    const state = reducer(stateBefore, action);
    expect(state.courses.length).toBe(0);
    expect(state.isLoading).toBeFalse();
  });

  it('should update course on updateCourseSuccess', () => {
    const stateBefore: CoursesState = {
      ...initialState,
      courses: [mockCourse],
    };
    const action = CourseActions.updateCourseSuccess({ course: updatedCourse });
    const state = reducer(stateBefore, action);
    expect(state.courses[0].title).toBe('Angular Actualizado');
    expect(state.isLoading).toBeFalse();
  });

  it('should set courseToEdit on setCourseToEditSuccess', () => {
    const action = CourseActions.setCourseToEditSuccess({ course: mockCourse });
    const state = reducer(initialState, action);
    expect(state.courseToEdit).toEqual(mockCourse);
  });

  it('should clear courseToEdit on clearCourseToEdit', () => {
    const stateBefore: CoursesState = {
      ...initialState,
      courseToEdit: mockCourse,
    };
    const action = CourseActions.clearCourseToEdit();
    const state = reducer(stateBefore, action);
    expect(state.courseToEdit).toBeNull();
  });
});
