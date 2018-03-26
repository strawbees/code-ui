export default (url) => {
	const vars = {}
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
		vars[key] = value
	})
	return vars
}
