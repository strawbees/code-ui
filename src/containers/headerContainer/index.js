import { connect } from 'react-redux'
import Header from 'src/components/header'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const HeaderContainer = (props) =>
	<Header {...props} />

const headerContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(HeaderContainer)

export default headerContainerConnected
