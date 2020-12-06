import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LightSensor from '../../../components/nodeParts/LightSensor'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const LightSensorContainer = (props) =>
	<LightSensor
		{...props}
	/>

LightSensorContainer.propTypes = {
	adjustScale : PropTypes.number,
}

const LightSensorContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(LightSensorContainer)

export default LightSensorContainerConnected
