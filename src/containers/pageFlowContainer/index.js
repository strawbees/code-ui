import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageFlowContainer = () =>
	<div>
		Flow!
	</div>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageFlowContainer)
