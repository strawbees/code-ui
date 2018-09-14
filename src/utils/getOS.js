import platform from 'platform'

const parsedPlatform = JSON.parse(JSON.stringify(platform))
export default () => parsedPlatform
