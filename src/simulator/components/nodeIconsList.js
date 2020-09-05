import PropTypes from 'prop-types'
import NodeIconResolverContainer from '../containers/nodeIconResolverContainer'

const NodeIconsList = ({
	internalDataIds
}) => {
	internalDataIds = JSON.parse(internalDataIds)
	return (
		<div className='root nodeIconsList'>
			{internalDataIds && internalDataIds.map(id =>
				<NodeIconResolverContainer key={id} id={id}/>
			)}
		</div>
	)
}
NodeIconsList.defaultProps = {
	internalDataIds : '[]'
}

NodeIconsList.propTypes = {
	internalDataIds : PropTypes.string
}

export default NodeIconsList
