import React, { useEffect, useLayoutEffect, useState } from 'react'
import ChatWindowLoader from './ChatWindowLoader'
import Message from './Message'
import ChatBox from './ChatBox'
import useMessages from '../_data/useMessages'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const ChatWindow = ({matches, setCurrentConvo, convoId, convoName, laravelEcho}) => {
	const {data, error, isLoading} = useMessages(convoId)
	const [messages, setMessages] = useState([])
	useLayoutEffect(() => {
		setMessages(data?.messages)
	}, [data])

	useEffect(() => {
		// createSocketConnection();
		const chatChannel = `chat.${convoId}`
		laravelEcho.private(chatChannel)
			.listen('MessageSent', (e) => {
				console.log('event', e)
			})
		console.log(`connected to chat.${convoId}`)

		return laravelEcho.leaveChannel(chatChannel)
		
	}, [convoId, laravelEcho])

	if (error) return "LOL Error"
	if (isLoading || messages === undefined) return <ChatWindowLoader />

	console.log('last message', messages.at(-1))
	const lastMessageId = messages.at(-1).id

	return (
		<section className='flex flex-col w-full' style={{maxHeight: 'inherit'}}>
			<div className='p-3 bg-slate-200'>
				{ !matches && 
					(
						<Button className='mr-2 rounded-xl py-2 px-3' onClick={() => {setCurrentConvo(null)}}>
							<ArrowLeftIcon className='h-4 w-4'/>
						</Button>
					)
				}
				{ convoName }
			</div>
			<main className='flex-1 overflow-y-auto'>
				{messages.map((message, index) => {
					// Check if message sender is the same as previous message; for margin styling
					const isSameSender = index > 0 && messages.at(index - 1).user_id == message.user_id
					return (
						<Message key={message.id} userId={message.user_id} userName={message.user.name} isSameSender={isSameSender}>
							{ message.message_text }
						</Message>
						)
				})}
			</main>
			<ChatBox lastMessageId={lastMessageId} messages={messages} setMessages={setMessages} convoId={convoId}/>
		</section>
	)
}

export default ChatWindow