import { connect } from 'react-redux'
import SideMenu from 'src/components/editors/flow/components/sideMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SideMenu)
