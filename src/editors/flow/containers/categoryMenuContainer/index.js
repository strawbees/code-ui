import { connect } from 'react-redux'
import CategoryMenu from 'src/editors/flow/components/categoryMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CategoryMenu)
