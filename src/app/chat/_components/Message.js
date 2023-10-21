import { AuthContext } from '@/components/providers/AuthProvider'
import React, { useContext } from 'react'

const Message = ({userId, userName, children}) => {
	const [auth, setAuth] = useContext(AuthContext)
	const sent = auth.id === userId
	return (
		<div className='flex flex-col'>
			<div className={`flex ${sent ? 'flex-row-reverse': ''}`}>
				{userName}
			</div>
			<div className={`flex ${sent ? 'flex-row-reverse' : ''}`}>
				<div className={`p-3 max-w-[60%] mb-3 rounded-sm flex flex-row-reverse ${sent ? 'bg-blue-300' : 'bg-slate-300'}`}>
					{ children }
				</div>
			</div>
		</div>
	)
}

export default Message