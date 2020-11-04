import PropTypes from 'prop-types'
import NodePartResolverContainer from '../containers/nodePartResolverContainer'

const NodePartsList = ({
	internalDataNodeIdsString
}) => {
	const internalDataNodeIds = JSON.parse(internalDataNodeIdsString)
	return (
		<>
			{internalDataNodeIds && internalDataNodeIds.map(id =>
				<NodePartResolverContainer key={id} id={id}/>
			)}
		</>
	)
}
NodePartsList.defaultProps = {
	internalDataNodeIdsString : '[]'
}

NodePartsList.propTypes = {
	internalDataNodeIdsString : PropTypes.string
}

export default NodePartsList
