import PropTypes from 'prop-types'
import NodeIconResolverContainer from '../containers/nodeIconResolverContainer'

const NodeIconsList = ({
	internalDataNodeIds
}) => {
	internalDataNodeIds = JSON.parse(internalDataNodeIds)
	return (
		<div className='root nodeIconsList'>
			{internalDataNodeIds && internalDataNodeIds.map(id =>
				<NodeIconResolverContainer key={id} id={id}/>
			)}
		</div>
	)
}
NodeIconsList.defaultProps = {
	internalDataNodeIds : '[]'
}

NodeIconsList.propTypes = {
	internalDataNodeIds : PropTypes.string
}

export default NodeIconsList
