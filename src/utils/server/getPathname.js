import React from 'react'
import { headers } from "next/headers";

const getPathname = () => {
	const headerList = headers()
	const fullUrl = headerList.get('x-url') || "";
	const protocol = headerList.get("x-forwarded-proto") || "";
	const domain = headerList.get("x-forwarded-host") || "";
	const basePath = `${protocol}://${domain}`
	return fullUrl.replace(basePath, '')
}

export default getPathname