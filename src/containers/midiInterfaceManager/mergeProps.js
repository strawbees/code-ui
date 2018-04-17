import {
	init,
	getLinks,
	enableLogs
} from 'quirkbot-midi-interface'

export default (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	midiInit       : init,
	midiGetLinks   : getLinks,
	midiEnableLogs : enableLogs
})
