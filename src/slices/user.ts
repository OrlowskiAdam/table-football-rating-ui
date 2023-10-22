import {createSlice} from "@reduxjs/toolkit";

interface UserSlice extends User {
    isAuthenticated: boolean;
}

const initialState: UserSlice = {
    id: ``,
    name: ``,
    nickname: ``,
    roles: [],
    ratings: [],
    isAuthenticated: false
}

const slice = createSlice({
    name: `user`,
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.nickname = action.payload.nickname;
            state.roles = action.payload.roles;
            state.ratings = action.payload.ratings;
            state.isAuthenticated = true;
        }
    }
});

export const authenticate = (userData: User[]) => async (dispatch: any) => {
    dispatch(slice.actions.login(userData))
};

export const userReducer = slice.reducer;