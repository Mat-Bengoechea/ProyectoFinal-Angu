import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Users } from '../interface/interface';

export const UserActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: Users[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Add User': props<{ user: Users }>(),
    'Add Users Success': props<{ user: Users }>(),
    'Add Users Failure': props<{ error: string }>(),
    'Update User': props<{ user: Users }>(),
    'Update Users Success': props<{ user: Users }>(),
    'Update Users Failure': props<{ error: string }>(),
    'Delete User': props<{ id: string }>(),
    'Delete Users Success': props<{ id: string }>(),
    'Delete Users Failure': props<{ error: string }>(),
    'Set User To Edit': props<{ id: string }>(),
    'Set User To Edit Success': props<{ user: Users }>(),
    'Set User To Edit Failure': props<{ error: string }>(),
    'Clear User To Edit':emptyProps(),
    'Clear Users': emptyProps(),
  },
});
