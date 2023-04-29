import React, { FC, useState } from 'react'

import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'
import clsx from 'clsx'

import mountain from '../../assets/mountain.jpg'
import WelcomeLogo from '../../components/ui/WelcomeLogo'
import RegisterForm from '../../components/form/RegisterForm'
import Options from '../../components/options/Options'

const RegisterScreen: FC = () => {
	const [isFormSubmitted, setIFormsSubmitted] = useState(false)

	return (
		<div className='h-screen bg-black flex'>
			<img src={mountain} alt='mountain' />
			<div className='flex pt-36 flex-col' style={{ margin: '0 auto' }}>
				<WelcomeLogo />
				<div style={{ margin: '42px 0 0 30px' }}>
					<ProgressBar
						percent={isFormSubmitted ? 100 : 50}
						filledBackground='#FFB800'
						unfilledBackground='#FFB800'
						width='150px'
						height='3px'
					>
						<Step>
							{({ accomplished = true }) => (
								<div
									className={clsx(
										'flex items-center justify-center w-11 h-11 rounded-full text-2xl font-normal ease-in duration-300',
										accomplished
											? 'bg-amber-400 '
											: 'border border-amber-400 text-white'
									)}
								>
									1
								</div>
							)}
						</Step>
						<Step>
							{({ accomplished = true }) => (
								<div
									className={clsx(
										'flex items-center justify-center w-11 h-11 rounded-full text-2xl font-normal ml-11 ease-in duration-300',
										accomplished
											? 'bg-amber-400 '
											: 'border border-amber-400 text-white'
									)}
								>
									2
								</div>
							)}
						</Step>
					</ProgressBar>
				</div>
				{isFormSubmitted ? (
					<Options />
				) : (
					<div>
						<div className='text-white text-3xl pt-14 ml-3'>
							Basic information
						</div>
						<RegisterForm
							isFormSubmitted={isFormSubmitted}
							setIFormsSubmitted={setIFormsSubmitted}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default RegisterScreen
