import { createAction, props } from "@ngrx/store";
import { User } from "src/types/users";

export const login = createAction(
    "[Login Page] User login",
    props<{user: User}>()
)

export const logout = createAction(
    "[Nav Bar] User logout"
)
