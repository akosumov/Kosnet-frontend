import React, { FC } from 'react'
import mountain from '../../assets/mountain.jpg'
import LoginForm from '../../components/form/LoginForm'
import { Link } from 'react-router-dom'
import WelcomeLogo from '../../components/ui/WelcomeLogo'

const AuthScreen: FC = () => {
	return (
		<div className='h-screen bg-black flex'>
			<img src={mountain} alt='mountain' />
			<div className='flex pt-36 flex-col' style={{ margin: '0 auto' }}>
				<WelcomeLogo />
				<div className='text-white text-2xl pt-14 ml-3'>
					Welcome, login to your account!
				</div>
				<LoginForm />
				<div className='text-white text-center pt-8'>
					Don’t have an account yet?{' '}
					<Link to={'/registration'} className='text-yellow-500'>
						{' '}
						Sign up!
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AuthScreen
