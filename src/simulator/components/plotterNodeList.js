import PropTypes from 'prop-types'
import PlotterNodeContainer from '../containers/plotterNodeContainer'

const knownPlotterNodeTypes = [
	'Wave'
]

const PlotterNodeList = ({
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
	internalDataNodeIdsString   : PropTypes.string,
	internalDataNodeTypesString : PropTypes.string,
}

export default PlotterNodeList
