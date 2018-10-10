import { connect } from 'react-redux'
import PageEmailConfirmation from 'src/components/pageEmailConfirmation'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageEmailConfirmationContainer = (props) =>
	<PageEmailConfirmation {...props}/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageEmailConfirmationContainer)
