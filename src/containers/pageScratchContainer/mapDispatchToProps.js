import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'
import {
	setScratchSource,
	setScratchGeneratedCode
} from 'src/actions/editor'

export default autobindDispatchToProps({
	setSource        : setScratchSource,
	setGeneratedCode : setScratchGeneratedCode
})
