import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IRegister } from '../../types/types'
import { registerApi } from '../../services/api'

const initialState: IRegister = {
	username: '',
	password: '',
	email: '',
	isLoading: false,
}

export const registerUserPost = createAsyncThunk(
	'register/registerUserPost',
	async ({ email, password, username }: IRegister) => {
		await registerApi({ email, password, username })
		return { email, password, username }
	}
)

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers: builder => {
		return (
			builder.addCase(registerUserPost.pending, (state, action) => {
				state.isLoading = true
			}),
			builder.addCase(registerUserPost.fulfilled, (state, action) => {
				state.isLoading = false
				state.email = action.payload.email
				state.username = action.payload.username
				state.password = action.payload.password
			})
		)
	},
})

export const registerReducer = registerSlice.reducer
