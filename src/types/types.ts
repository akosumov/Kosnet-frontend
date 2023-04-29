export interface IUser {
	_id: string
	username: string
	password: string
	email: string
	thoughts?: object[]
	friends?: object[]
	friendCount?: number
	__v?: number
	isLoading?: boolean
}

export interface IRegister {
	email: string
	password: string
	username: string
	_id?: string
	isLoading?: boolean
}

export interface ICreateThoughts {
	thoughtText?: string
	username: string
	userId: string
	prevState?: null
}

export interface IThoughts {
	[index: number]: {
		_id: string
		thoughtText: string
		username: string
		createdAt: string
		reactions: Array<object>
		__v: number
		reactionCount: number
		key: any
	}
	map: Function
}

export interface IAddFriend {
	userId: string
	friendId: string
}
