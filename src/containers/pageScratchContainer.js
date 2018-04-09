import { connect } from 'react-redux'
import pageScratchContainerSelector from 'src/selectors/containers/pageScratchContainerSelector'
import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'
import {
	setScratchSource,
	setScratchGeneratedCode
} from 'src/actions/editor'
import ScratchEditor from 'src/components/editors/scratch'

const onSourceCodeChange = (source) => {
	console.log(source)
}

const fns = {
	onSourceCodeChange
}


const PageScratchContainer = (props) =>
	<ScratchEditor {...props} {...fns}/>


const mapStateToProps = pageScratchContainerSelector
const mapDispatchToProps = autobindDispatchToProps({
	setSource        : setScratchSource,
	setGeneratedCode : setScratchGeneratedCode
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageScratchContainer)
