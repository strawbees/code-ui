import { connect } from 'react-redux'
import PageHome from 'src/components/pageHome'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const pageHomeContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageHome)

export default pageHomeContainerConnected
