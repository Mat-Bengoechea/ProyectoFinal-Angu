import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Student } from '../interface/interface';
import { StudentActions } from './student.actions';

export const studentsFeatureKey = 'students';

export interface StudentState {
  students: Student[];
  isLoading: boolean;
  error: any;
  studentToEdit: Student | null;
}

export const initialState: StudentState = {
  students: [],
  isLoading: false,
  error: null,
  studentToEdit: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    isLoading: false,
    students,
  })),
  on(StudentActions.loadStudentsFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(StudentActions.addStudent, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentActions.addStudentSuccess, (state, { student }) => {
    return {
      ...state,
      isLoading: false,
      students: [...state.students, student],
    };
  }),
  on(StudentActions.addStudentFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(StudentActions.deleteStudent, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(StudentActions.deleteStudentSuccess,(state,{id})=>{
  return {
    ...state,
    isLoading:false,
    students: state.students.filter((student)=> student.id !== id),
  }
}),

  on(StudentActions.deleteStudentFailure,(state,{error})=>{
  return {
    ...state,
    isLoading:false,
    error: error,
  }
}),

  on(StudentActions.updateStudent, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(StudentActions.updateStudentSuccess, (state, { student }) => ({
    ...state,
    isLoading: false,
    students: state.students.map((s) => (s.id === student.id ? student : s)),
  })),

  on(StudentActions.updateStudentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(StudentActions.setStudentToEditSuccess, (state, { student }) => ({
    ...state,
    studentToEdit: student,
  })),
  on(StudentActions.clearStudentToEdit, (state) => ({
    ...state,
    studentToEdit: null,
  }))
);


export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
  extraSelectors: ({ selectStudentsState }) => ({
    selectStudents: createSelector(
      selectStudentsState,
      (state) => state.students
    ),
    selectIsLoading: createSelector(
      selectStudentsState,
      (state) => state.isLoading
    ),
    selectError: createSelector(selectStudentsState, (state) => state.error),
  }),
});

export const { selectStudents, selectIsLoading, selectError } = studentsFeature;
