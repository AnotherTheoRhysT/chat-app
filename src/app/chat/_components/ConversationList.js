import React, { useEffect, useLayoutEffect, useState } from 'react'
import useConversations from '../_data/useConversations'
import ConversationListLoader from './ConversationListLoader'

const ConversationList = ({currentConvo, setCurrentConvo}) => {
	const {data, error, isLoading} = useConversations()

	if (error) {
		console.log('Conversations Error', error)
		return 'Error in fetching conversations'
	}
	if (isLoading) return <ConversationListLoader />
	if (data?.conversations)
		return (
			<ul>
				{data.conversations.map(conversation => {
					// if (conversation.id == 11) setCurrentConvo(conversation)	// For testing only
					const active = conversation.id === currentConvo?.id
					return (
						<div key={conversation.id} className={`py-2 px-1 hover:bg-slate-200 ${active ? 'bg-slate-200' : ''}`} onClick={() => {setCurrentConvo(conversation)}}>
							<li key={conversation.id}>{conversation.conversation_name ?? 'No Name'}</li>
						</div>
					)
				})}
			</ul>
		)
}

export default ConversationList