import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    role: localStorage.getItem("role")
}

export const authSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        LogIn: (state, action) => {
            state.token = action.payload.token,
                state.userId = action.payload.userId,
                state.isAuthenticated = true
        }, logout: (state) => {
            // state.user=null
            localStorage.removeItem('token'),
                localStorage.removeItem('userId')
            state.isAuthenticated = false
        },
    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer;