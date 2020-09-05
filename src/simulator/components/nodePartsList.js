import PropTypes from 'prop-types'
import NodePartResolverContainer from '../containers/nodePartResolverContainer'

const NodePartsList = ({
	internalDataIds
}) => {
	internalDataIds = JSON.parse(internalDataIds)
	return (
		<div className='root nodePartsList'>
			{internalDataIds && internalDataIds.map(id =>
				<NodePartResolverContainer key={id} id={id}/>
			)}
		</div>
	)
}
NodePartsList.defaultProps = {
	internalDataIds : '[]'
}

NodePartsList.propTypes = {
	internalDataIds : PropTypes.string
}

export default NodePartsList
