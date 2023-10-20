import React, { Suspense } from 'react'
import Navbar from './_components/Navbar'
import AuthProvider from '../../components/providers/AuthProvider'
import NavbarLoader from './_components/NavbarLoader'


const ChatLayout = ({ children }) => {
	return (
		<AuthProvider>
			<Suspense fallback={ <NavbarLoader /> }>
				<Navbar />
			</Suspense>
			{/* <div className='flex justify-between'>
			</div> */}
			{children}
		</AuthProvider>
	)
}

export default ChatLayout