import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PhysicalRepresentation from '../../components/physicalRepresentation'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PhysicalRepresentationContainer = (props) =>
	<PhysicalRepresentation
		{...props}
	/>

PhysicalRepresentationContainer.propTypes = {
	containerWidth : PropTypes.number
}

const PhysicalRepresentationContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PhysicalRepresentationContainer)

export default PhysicalRepresentationContainerConnected
