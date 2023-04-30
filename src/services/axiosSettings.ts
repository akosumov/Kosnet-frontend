import axios from 'axios'

export const API_URL = 'https://kosnet-production.up.railway.app'

export const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})
