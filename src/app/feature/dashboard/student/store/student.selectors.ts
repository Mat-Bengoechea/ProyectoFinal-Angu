import { selectAll, studentsFeatureKey, StudentState } from "./student.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectStudentState =
  createFeatureSelector<StudentState>(studentsFeatureKey);

  export const selectStudents = selectAll;
    

    export const selectStudentsLoading = createSelector(
      selectStudentState,
      (state) => state.isLoading
    );

    export const selectStudentsError = createSelector(
      selectStudentState,
      (state) => state.error
    );

    export const selectStudentById = (id: string) => createSelector(
      selectStudents,
      (students) => students.find(student => student.id === id)
    );