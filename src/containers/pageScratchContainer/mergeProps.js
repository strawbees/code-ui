import { updateProgramSource } from 'src/utils/storage'

export default (stateProps, dispatchProps, ownProps) => {
	const {
		id,
		saved,
	} = stateProps

	const {
		setScratchSource,
		setScratchGeneratedCode
	} = dispatchProps


	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		onSourceChange : (source) => {
			setScratchSource(source)
			if (saved) {
				updateProgramSource(id, source)
			}
			// setScratchGeneratedCode()
		}
	}
}
