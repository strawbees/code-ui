import { addProgram } from 'src/utils/storage'

export default (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	addProgram
})
