import { connect } from 'react-redux'
import SideMenu from 'src/editors/flow/components/sideMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const sideMenuContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SideMenu)

export default sideMenuContainerConnected
