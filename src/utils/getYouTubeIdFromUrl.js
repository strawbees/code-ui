export default url => {
	url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
	if (url[2] !== undefined) {
		return url[2].split(/[^0-9a-z_-]/i)[0]
	}
	return url
}
