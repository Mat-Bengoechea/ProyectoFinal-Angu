import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../interface/course';
import { CourseActions } from './course.actions';
import { Update } from '@ngrx/entity';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: any;
}

export const initialState: CoursesState = {
  courses: [],
  isLoading: false,
  error: null,
};

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
  })
);

export const CourseFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
})
