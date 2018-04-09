import { connect } from 'react-redux'
import ScratchEditor from 'src/components/editors/scratch'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const onSourceCodeChange = (source) => {
	console.log(source)
}

const fns = {
	onSourceCodeChange
}


const PageScratchContainer = (props) =>
	<ScratchEditor {...props} {...fns}/>


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageScratchContainer)
