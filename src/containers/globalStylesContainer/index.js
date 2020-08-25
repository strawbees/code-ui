import { connect } from 'react-redux'
import GlobalStyles from 'src/components/globalStyles'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const GlobalStylesContainer = (props) =>
	<GlobalStyles {...props}/>

const globalStylesContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(GlobalStylesContainer)

export default globalStylesContainerConnected
