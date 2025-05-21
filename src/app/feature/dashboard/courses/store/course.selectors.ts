import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesFeatureKey, CoursesState } from "./course.reducer";

export const selectCourseState =
createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectCourses = createSelector(
    selectCourseState,
    (state) => state.courses
);

export const selectCoursesLoading = createSelector(
    selectCourseState,
    (state) => state.isLoading
);

export const selectCoursesError = createSelector(
    selectCourseState,
    (state) => state.error
);

export const selectCourseByTitle = (title: string) => createSelector(
  selectCourses,
  (courses) => courses.find(course => course.title.toLowerCase() === title.toLowerCase())
);

