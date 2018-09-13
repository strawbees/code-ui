import platform from 'platform'

const parsedPlatform = JSON.parse(JSON.stringify(platform))
export default () => {
	console.log(parsedPlatform)
	return parsedPlatform
}
