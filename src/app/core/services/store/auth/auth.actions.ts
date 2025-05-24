import { createAction, props } from "@ngrx/store";
import { User } from "../../../../feature/auth/interfaces/User";


export interface AuthPayload {
    email: string;
    role: string;
};

export const setAuthUser = createAction(
    "[Auth] SetAuthUser",
    props<{payload: User}>()
);

export const unsetAuthUser = createAction('[Auth] UnsetAuthUser');


export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);