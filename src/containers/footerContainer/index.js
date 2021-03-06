import { connect } from 'react-redux'
import Footer from 'src/components/footer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const footerContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Footer)

export default footerContainerConnected
