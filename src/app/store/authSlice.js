import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    user: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        login: (state, action) => {

            const userData = action.payload;

            state.isAuthenticated = true;
            state.user = userData;
        },

        logout: (state, action) => {

            state.isAuthenticated = false;
            state.user = null;
        },

        followUnfollowUser: (state, action) => {

            const userId = action.payload;

            const isUserAlreadyPresent = state.user.followings.find((u) => u.userId === userId);

            if(isUserAlreadyPresent !== undefined) {
                state.user.followings.pop(userId);
            } else if(isUserAlreadyPresent === undefined) {
                state.user.followings.push({userId});
            }

        }

    }
});

export const { login, logout, followUnfollowUser } = AuthSlice.actions;

export default AuthSlice.reducer;