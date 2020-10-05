import { connect } from 'react-redux'
import PageEmailConfirmation from 'src/components/pageEmailConfirmation'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageEmailConfirmationContainer = (props) =>
	<PageEmailConfirmation {...props}/>

const pageEmailConfirmationContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageEmailConfirmationContainer)

export default pageEmailConfirmationContainerConnected
