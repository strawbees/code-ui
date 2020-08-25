import { connect } from 'react-redux'
import Modal from 'src/components/modal'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const modalContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Modal)

export default modalContainerConnected
