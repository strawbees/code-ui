import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageTextContainer = () =>
	<div>
		Text!
	</div>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageTextContainer)
