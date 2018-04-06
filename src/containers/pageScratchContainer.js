import { connect } from 'react-redux'
import pageScratchContainerSelector from 'src/selectors/containers/pageScratchContainerSelector'
import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'
import {
	setScratchSource,
	setScratchGeneratedCode
} from 'src/actions/editor'
import ScratchEditor from 'src/components/editors/scratch'
import Spinner from 'src/components/spinner'


const PageScratchContainer = (props) => {
	// as the editor breaks if the correct strings are not in place,
	// we need to make sure they are loaded before diplaying it
	if (!props.strings) {
		return <Spinner />
	}
	return (
		<ScratchEditor {...props}/>
	)
}


const mapStateToProps = pageScratchContainerSelector
const mapDispatchToProps = autobindDispatchToProps({
	setSource        : setScratchSource,
	setGeneratedCode : setScratchGeneratedCode
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageScratchContainer)
