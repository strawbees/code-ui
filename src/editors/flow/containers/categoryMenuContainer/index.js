import { connect } from 'react-redux'
import CategoryMenu from 'src/editors/flow/components/categoryMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const categoryMenuContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CategoryMenu)

export default categoryMenuContainerConnected
