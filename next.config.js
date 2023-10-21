/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
		PUSHER_DISABLE_STATS: process.env.PUSHER_DISABLE_STATS,
		PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
		WS_SERVICE: process.env.WS_SERVICE,
		WS_HOST: process.env.WS_HOST,
		WS_PORT: process.env.WS_PORT,
		WS_FORCE_TLS: process.env.WS_FORCE_TLS,
		WS_ENCRYPTED: process.env.WS_ENCRYPTED,
	}
}

module.exports = nextConfig
