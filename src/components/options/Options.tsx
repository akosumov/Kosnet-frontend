import React, { FC, useContext } from 'react'
import { optionsInterest } from './optionList'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { authContext } from '../../context'

const Options: FC = () => {
	const selector = useAppSelector(state => state.register)
	localStorage.setItem('user', JSON.stringify(selector))
	const { setIsAuth } = useContext(authContext)
	const login = (e: any) => {
		e.preventDefault()
		setIsAuth(true)
		localStorage.setItem('auth', 'true')
	}

	return (
		<div className='flex flex-col'>
			<div className='text-white text-3xl pt-14 ml-3'>Interests</div>
			<div className='border border-slate-900 pt-5 pl-5 pb-1 mt-5'>
				<ul>
					{optionsInterest.map(option => (
						<li key={option} className='mb-2'>
							<input id={option} type='checkbox' className='checkboxStyles' />
							<label className='text-white text-base ml-3'>{option}</label>
						</li>
					))}
				</ul>
			</div>
			<Link
				to={'/feed'}
				className='mt-10 bg-yellow-500 rounded-lg h-16 text-black font-bold flex justify-center align-center'
				onClick={e => login(e)}
			>
				<button>Sign up</button>
			</Link>
		</div>
	)
}

export default Options
