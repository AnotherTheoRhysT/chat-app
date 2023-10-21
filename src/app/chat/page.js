'use client'

import React, { useLayoutEffect, useState } from 'react'
import ConversationList from './_components/ConversationList'
import ChatWindow from './_components/ChatWindow'
import styles from '@/styles/chat.module.css'

import Cookies from 'universal-cookie'
import Echo from 'laravel-echo'
import useMediaQuery from './_data/useMediaQuery'

const cookies = new Cookies()
const bearerToken = cookies.get('bearer-token')
window.Pusher = require('pusher-js')
const laravelEcho = new Echo({
		broadcaster: process.env.WS_SERVICE,
		key: process.env.PUSHER_APP_KEY,
		wsHost: process.env.WS_HOST ?? '127.0.0.1',
		wsPort: process.env.WS_PORT ?? 6001,
		// wssPort: process.env.WS_PORT ?? 6001,
		forceTLS: process.env.WS_FORCE_TLS === 'true',
		encrypted: process.env.WS_ENCRYPTED === 'true',
		disableStats: process.env.PUSHER_DISABLE_STATS === 'true',
		enabledTransports: ['ws'],
		cluster: process.env.PUSHER_CLUSTER,
		authEndpoint: `${process.env.SERVER_URL}/broadcasting/auth`,
		auth: {
			headers: {
				Authorization: bearerToken
			},
		},
	})

console.log("Main file loading")

const Page = () => {
	const [currentConvo, setCurrentConvo] = useState(null)
	const matches = useMediaQuery('min-width: 960px')

	useLayoutEffect(() => {
		console.log("Main page rendering")
	}, [])

	if (matches) {
		return (
			<main className={styles.chat_container}>
				<ConversationList currentConvo={currentConvo} setCurrentConvo={setCurrentConvo}/>
				{
					currentConvo?.id != null ?
						<ChatWindow matches={matches} setCurrentConvo={setCurrentConvo} convoId={currentConvo?.id} convoName={currentConvo?.conversation_name} laravelEcho={laravelEcho}/> 
						:
						(`Select Convo ${ matches ? 'true' : 'false' }`)
				}
			</main>
		)
	} else if (currentConvo?.id != null) {
		return <ChatWindow matches={matches} setCurrentConvo={setCurrentConvo} convoId={currentConvo?.id} convoName={currentConvo?.conversation_name} laravelEcho={laravelEcho}/> 
	} else {
		return <ConversationList currentConvo={currentConvo} setCurrentConvo={setCurrentConvo}/>
	}
}

export default Page
