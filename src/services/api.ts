import { IRegister, ICreateThoughts } from '../types/types'
import { $api } from './axiosSettings'

export const registerApi = ({ email, password, username }: IRegister) => {
	$api
		.post('/api/users/', {
			email,
			password,
			username,
		})
		.then(function (res) {
			localStorage.setItem('USERID', res.data._id)
		})
		.catch(function (err) {
			console.log(`err123 ${err}`)
		})
}

export const createThoughts = async ({
	thoughtText,
	username,
	userId,
}: ICreateThoughts) => {
	try {
		const { data } = await $api.post('/api/thoughts/', {
			thoughtText,
			username,
			userId,
		})
		return data
	} catch (error) {
		console.log(error)
	}
}

export const getThought = async (_id: string) => {
	try {
		const { data } = await $api.get(`/api/thoughts/${_id}`)
		return data
	} catch (error) {
		console.log(error)
	}
}

export const findUserById = async (_id: string) => {
	try {
		const { data } = await $api.get(`/api/users/${_id}`)
		return data
	} catch (error) {
		console.log(error)
	}
}

export const getAllUser = async () => {
	try {
		const { data } = await $api.get(`/api/users`)
		console.log('Data successfully')
		return data
	} catch (error) {
		console.log(error)
	}
}

export const deleteThought = async (thoughtsId: string) => {
	try {
		await $api.delete(`/api/thoughts/${thoughtsId}`)
		console.log('Thought delete')
	} catch (error) {
		console.log(error)
	}
}

export const addFriendById = async (userId: string, friendId: string) => {
	try {
		await $api.post(`/api/users/${userId}/friends/${friendId}`)
		console.log('You added a person as a friend')
	} catch (error) {
		console.log(error)
	}
}

export const deleteFriendById = async (userId: string, friendId: string) => {
	try {
		await $api.delete(`/api/users/${userId}/friends/${friendId}`)
		console.log('Your friend has been deleted ')
	} catch (error) {
		console.log(error)
	}
}

export const updateEmail = async (userId: string, data: any) => {
	const userName = JSON.parse(localStorage.getItem('user') as any).username
	const password = JSON.parse(localStorage.getItem('user') as any).password
	try {
		await $api.put(`/api/users/${userId}`, {
			email: data,
		})
		localStorage.setItem('user', '')
		localStorage.setItem(
			'user',
			JSON.stringify({
				username: userName,
				password: password,
				email: data,
				isLoading: false,
			})
		)
		console.log('Your information has been changed')
	} catch (error) {
		console.log(error)
	}
}

export const updateUsername = async (userId: string, data: any) => {
	const email = JSON.parse(localStorage.getItem('user') as any).email
	const password = JSON.parse(localStorage.getItem('user') as any).password
	try {
		await $api.put(`/api/users/${userId}`, {
			username: data,
		})
		localStorage.setItem('user', '')
		localStorage.setItem(
			'user',
			JSON.stringify({
				username: data,
				password: password,
				email: email,
				isLoading: false,
			})
		)
		console.log('Your information has been changed')
	} catch (error) {
		console.log(error)
	}
}

export const deleteUser = async (userId: string) => {
	try {
		await $api.delete(`/api/users/${userId}`)
		localStorage.clear()
		console.log('you have successfully deleted the account')
	} catch (error) {
		console.log(error)
	}
}
