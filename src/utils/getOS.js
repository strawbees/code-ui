import platform from 'platform'

const parsedPlatform = JSON.parse(JSON.stringify(platform))
parsedPlatform.node = {
	platform : parsedPlatform.os.family.toLowerCase().indexOf('windows') !== -1 ?
		'win32' :
		parsedPlatform.os.family.toLowerCase().indexOf('os x') !== -1 ?
			'darwin' :
			'',
	arch : parsedPlatform.os.architecture === 64 ?
		'x64' :
		parsedPlatform.os.architecture === 32 ?
			'ia32' :
			''
}
const getOS = () => parsedPlatform

export default getOS
