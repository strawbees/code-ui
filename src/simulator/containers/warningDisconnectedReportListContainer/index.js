import { connect } from 'react-redux'
import WarningDisconnectedReportList from '../../components/warningDisconnectedReportList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const WarningDisconnectedReportListContainer = (props) =>
	<WarningDisconnectedReportList
		{...props}
	/>

const WarningDisconnectedReportListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(WarningDisconnectedReportListContainer)

export default WarningDisconnectedReportListContainerConnected
