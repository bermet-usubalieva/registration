import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userAPI } from "../API";


export type UserState = {
    last_name: string;
    first_name: string;
    phone: string;
    email: string;
    password: string;
}


const initialState: UserState = {
    last_name: '',
    first_name: '',
    phone: '',
    email: '',
    password: '',
}

export const postUser = createAsyncThunk<UserState, UserState, { rejectValue: string }>(
    'user/postUser',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await userAPI.registrationUser(userData);
            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.errors) {
                const serverErrors = error.response.data.errors;
                const emailError = serverErrors.find((err: any) => err.attr === 'email');

                if (emailError) {
                    return rejectWithValue(emailError.detail);
                }
            }
            return rejectWithValue('Server error!');
        }
    }
);

export const getLogin = createAsyncThunk<{ token: string }, { email: string; password: string }, { rejectValue: string }>(
    'user/getLogin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await userAPI.login(email, password)

            return res.data.user;
        } catch (error: any) {
            return rejectWithValue('Server error!');
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(postUser.fulfilled, (state, action) => {
            return action.payload
        })
        addCase(postUser.rejected, (state, action) => {
            if (action.payload) {
                console.error(action.payload);
            } else {
                console.error('Server error!');
            }
        })
            .addCase(getLogin.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
    }
})
export const { setEmail } = userSlice.actions;
export default userSlice.reducer
