import { connect } from 'react-redux'
import PagePasswordReset from 'src/components/pagePasswordReset'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PagePasswordResetContainer = (props) =>
	<PagePasswordReset {...props}/>

const pagePasswordResetContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PagePasswordResetContainer)

export default pagePasswordResetContainerConnected
