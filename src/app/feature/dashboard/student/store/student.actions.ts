import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Student } from '../interface/interface';

export const StudentActions = createActionGroup({
  source: 'Student/API',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Failure': props<{ error: string }>(),
    'Clear Students': emptyProps(),
  },
});
