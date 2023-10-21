import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

const useMessages = (conversationId) => {
	const { data, error, isLoading } = useSWR(conversationId !== null ? `${process.env.SERVER_URL}/api/chat/message/${conversationId}` : null, fetcher)
	return {
		data, error, isLoading
	}
}

export default useMessages