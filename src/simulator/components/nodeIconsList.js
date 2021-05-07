import PropTypes from 'prop-types'
import NodeIconResolverContainer from '../containers/nodeIconResolverContainer'

const NodeIconsList = ({
	internalDataNodeIdsString,
}) => {
	const internalDataNodeIds = JSON.parse(internalDataNodeIdsString)
	return (
		<div className='root nodeIconsList'>
			{internalDataNodeIds && internalDataNodeIds.map(id =>
				<NodeIconResolverContainer key={id} id={id}/>
			)}
		</div>
	)
}
NodeIconsList.defaultProps = {
	internalDataNodeIdsString : '[]',
}

NodeIconsList.propTypes = {
	internalDataNodeIdsString : PropTypes.string,
}

export default NodeIconsList
