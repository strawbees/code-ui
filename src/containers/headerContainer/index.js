import { connect } from 'react-redux'
import Header from 'src/components/header'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const HeaderContainer = (props) =>
	<Header {...props} />

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(HeaderContainer)
