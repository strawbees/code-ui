import PropTypes from 'prop-types'
import WarningDisconnectedReportContainer from '../containers/warningDisconnectedReportContainer'

const WarningDisconnectedReportList = ({
	nodeTypesString,
}) => {
	const nodeTypes = JSON.parse(nodeTypesString)
	return (
		<div className='root warningDisconnectedReportList'>
			<style jsx>{`
				.root {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			`}</style>
			{nodeTypes.map((nodeType, i) =>
				<WarningDisconnectedReportContainer key={i} nodeType={nodeType}/>
			)}
		</div>
	)
}
WarningDisconnectedReportList.defaultProps = {
	nodeTypesString : '[]',
}

WarningDisconnectedReportList.propTypes = {
	nodeTypesString : PropTypes.string,
}

export default WarningDisconnectedReportList
