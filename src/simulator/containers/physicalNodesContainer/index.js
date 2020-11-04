import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PhysicalNodes from '../../components/physicalNodes'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PhysicalNodesContainer = (props) =>
	<PhysicalNodes
		{...props}
	/>

PhysicalNodesContainer.propTypes = {
	containerWidth : PropTypes.number
}

const PhysicalNodesContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PhysicalNodesContainer)

export default PhysicalNodesContainerConnected
