import { AuthContext } from '@/components/providers/AuthProvider'
import React, { useContext } from 'react'

const Message = ({userId, userName, children, isSameSender}) => {
	const [auth, setAuth] = useContext(AuthContext)
	const sent = auth.id === userId

	return (
		<div className={`flex flex-col ${isSameSender ? 'mt-0.5' : 'mt-3'}`}>
			{!sent && 
				<div className='flex'>
					{userName}
				</div>
			}
			<div className={`flex ${sent ? 'flex-row-reverse' : ''}`}>
				{/* mb-3 */}
				<div className={`p-3 max-w-[60%] flex flex-row-reverse ${sent ? 'bg-blue-300 rounded-l-md' : 'bg-slate-300 round-r-md'}`}>
					{ children }
				</div>
			</div>
		</div>
	)
}

export default Message