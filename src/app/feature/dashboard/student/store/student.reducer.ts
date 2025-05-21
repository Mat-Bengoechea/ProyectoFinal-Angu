import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../interface/interface';
import { StudentActions } from './student.actions';

export const studentsFeatureKey = 'students';

export interface StudentState extends EntityState<Student> {
  isLoading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState: StudentState = adapter.getInitialState({
  students: [],
  isLoading: false,
  error: null,
});

export const reducer = createReducer(
  initialState,
on(StudentActions.loadStudents, (state)=>{
  return {
    ...state,
    isLoading: true,
  };
}),
on(StudentActions.loadStudentsSuccess, (state, { students }) => {
  return adapter.setAll(students, {
    ...state,
    isLoading: false,
  });
}),
on(StudentActions.loadStudentsFailure, (state, { error }) => {
  return {
    ...state,
    isLoading: false,
    error: error,
  };
}),
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
  extraSelectors: ({ selectStudentsState }) => ({
    ...adapter.getSelectors(selectStudentsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = studentsFeature;
