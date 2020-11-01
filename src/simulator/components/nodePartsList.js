import PropTypes from 'prop-types'
import NodePartResolverContainer from '../containers/nodePartResolverContainer'

const NodePartsList = ({
	internalDataNodeIds
}) => {
	internalDataNodeIds = JSON.parse(internalDataNodeIds)
	return (
		<>
			{internalDataNodeIds && internalDataNodeIds.map(id =>
				<NodePartResolverContainer key={id} id={id}/>
			)}
		</>
	)
}
NodePartsList.defaultProps = {
	internalDataNodeIds : '[]'
}

NodePartsList.propTypes = {
	internalDataNodeIds : PropTypes.string
}

export default NodePartsList
