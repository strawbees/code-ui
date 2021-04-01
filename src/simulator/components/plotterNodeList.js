import PropTypes from 'prop-types'
import PlotterNodeContainer from '../containers/plotterNodeContainer'

const knownPlotterNodeTypes = [
	// Brains
	'Wave',
	'Randomizer',
	'Constrain',
	'Converter',
	// Inputs
	'CircuitTouch',
	'LightSensor',
	'SqueezeSensor',
	'IRProximity',
	'Sonar',
	'AnalogSensor',
	'DigitalSensor',
]

const PlotterNodeList = ({
	containerWidth,
	internalDataNodeIdsString,
	internalDataNodeTypesString,
}) => {
	const internalDataNodeIds = JSON.parse(internalDataNodeIdsString)
	const internalDataNodeTypes = JSON.parse(internalDataNodeTypesString)
	const idsByType = {}
	internalDataNodeIds.forEach((id, i) => {
		const type = internalDataNodeTypes[i]
		if (!idsByType[type]) {
			idsByType[type] = []
		}
		idsByType[type].push(id)
	})

	const plotterNodesTypes = Object.keys(idsByType)
		.filter(type => knownPlotterNodeTypes.indexOf(type) !== -1)
	return (
		<>
			{plotterNodesTypes.map((type) => idsByType[type].map((id) =>
				<PlotterNodeContainer
					key={id}
					id={id}
					containerWidth={containerWidth}
				/>
			))}
		</>
	)
}
PlotterNodeList.defaultProps = {
	internalDataNodeIdsString   : '[]',
	internalDataNodeTypesString : '[]',
}

PlotterNodeList.propTypes = {
	containerWidth              : PropTypes.number,
	internalDataNodeIdsString   : PropTypes.string,
	internalDataNodeTypesString : PropTypes.string,
}

export default PlotterNodeList
