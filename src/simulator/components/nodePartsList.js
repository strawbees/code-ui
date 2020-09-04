import PropTypes from 'prop-types'
import NodePartResolverContainer from '../containers/nodePartResolverContainer'

const NodePartsList = ({
	reportIds
}) => {
	reportIds = JSON.parse(reportIds)
	return (
		<div className='root nodePartsList'>
			{reportIds && reportIds.map(id =>
				<NodePartResolverContainer key={id} id={id}/>
			)}
		</div>
	)
}
NodePartsList.defaultProps = {
	reportIds : '[]'
}

NodePartsList.propTypes = {
	reportIds : PropTypes.string
}

export default NodePartsList
