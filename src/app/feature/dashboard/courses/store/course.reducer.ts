import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../interface/course';
import { CourseActions } from './course.actions';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
  courses: Course[];
  isLoading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CoursesState = adapter.getInitialState({
  courses: [],
  isLoading: false,
  error: null,
})


export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) => {
    return {
      ...state,
      isLoading: false,
      courses,
    };
  }),
  on(CourseActions.loadCoursesFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(CourseActions.addCourse, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseActions.addCourseSuccess, (state, { course }) => {
    return {
      ...state,
      isLoading: false,
      courses: [...state.courses, course],
    };
  }),
  on(CourseActions.addCourseFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(CourseActions.deleteCourse, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(CourseActions.deleteCourseSuccess, (state, { id }) => {
    return {
      ...state,
      isLoading: false,
      courses: state.courses.filter((course) => course.id !== id),
    };
  }),
  on(CourseActions.deleteCourseFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
);

export const CourseFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
  extraSelectors: ({ selectCoursesState }) => ({
    ...adapter.getSelectors(selectCoursesState),
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = CourseFeature;
