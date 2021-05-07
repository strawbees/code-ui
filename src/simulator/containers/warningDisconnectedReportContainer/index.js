import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WarningDisconnectedReport from '../../components/warningDisconnectedReport'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const WarningDisconnectedReportContainer = (props) =>
	<WarningDisconnectedReport
		{...props}
	/>

WarningDisconnectedReportContainer.propTypes = {
	nodeType : PropTypes.string,
}

const WarningDisconnectedReportContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(WarningDisconnectedReportContainer)

export default WarningDisconnectedReportContainerConnected
