import { connect } from 'react-redux'
import GlobalStyles from 'src/components/globalStyles'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const GlobalStylesContainer = (props) =>
	<GlobalStyles {...props}/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(GlobalStylesContainer)
