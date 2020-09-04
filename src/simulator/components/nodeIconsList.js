import PropTypes from 'prop-types'
import NodeIconResolverContainer from '../containers/nodeIconResolverContainer'

const NodeIconsList = ({
	reportIds
}) => {
	reportIds = JSON.parse(reportIds)
	return (
		<div className='root nodeIconsList'>
			{reportIds && reportIds.map(id =>
				<NodeIconResolverContainer key={id} id={id}/>
			)}
		</div>
	)
}
NodeIconsList.defaultProps = {
	reportIds : '[]'
}

NodeIconsList.propTypes = {
	reportIds : PropTypes.string
}

export default NodeIconsList
