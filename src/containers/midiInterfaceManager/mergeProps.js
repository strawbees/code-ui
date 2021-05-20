import {
	init,
	getLinks,
	enableLogs,
	disableLogs,
} from 'quirkbot-midi-interface'

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	midiInit        : init,
	midiGetLinks    : getLinks,
	midiEnableLogs  : enableLogs,
	midiDisableLogs : disableLogs,
})

export default mergeProps
