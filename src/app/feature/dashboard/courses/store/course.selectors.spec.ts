import { selectCourses, selectCoursesLoading, selectCoursesError, selectCourseByTitle, selectCourseToEdit, selectCourseState } from './course.selectors';
import { CoursesState, coursesFeatureKey } from './course.reducer';
import { Course } from '../interface/course';

describe('Course Selectors', () => {
  const mockCourse1: Course = {
    id: '1',
    title: 'Angular Basics',
    description: 'Learn Angular',
    time: '60',
  };

  const mockCourse2: Course = {
    id: '2',
    title: 'React Basics',
    description: 'Learn React',
    time: '45',
  };

  const initialState: CoursesState = {
    courses: [mockCourse1, mockCourse2],
    isLoading: false,
    error: null,
    courseToEdit: mockCourse1,
    ids: [],
    entities: {},
  };

  it('should select the course feature state', () => {
    const result = selectCourseState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all courses', () => {
    const result = selectCourses.projector(initialState);
    expect(result.length).toBe(2);
    expect(result).toEqual(initialState.courses);
  });

  it('should select loading state', () => {
    const result = selectCoursesLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select error state', () => {
    const result = selectCoursesError.projector(initialState);
    expect(result).toBeNull();
  });

  it('should select course by title (case insensitive)', () => {
    const selector = selectCourseByTitle('angular basics');
    const result = selector.projector(initialState.courses);
    expect(result).toEqual(mockCourse1);

    const selector2 = selectCourseByTitle('REACT BASICS');
    const result2 = selector2.projector(initialState.courses);
    expect(result2).toEqual(mockCourse2);

    const selector3 = selectCourseByTitle('nonexistent');
    const result3 = selector3.projector(initialState.courses);
    expect(result3).toBeUndefined();
  });

  it('should select course to edit', () => {
    const result = selectCourseToEdit.projector(initialState);
    expect(result).toEqual(mockCourse1);
  });
});
