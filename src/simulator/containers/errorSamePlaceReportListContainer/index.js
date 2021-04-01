import { connect } from 'react-redux'
import ErrorSamePlaceReportList from '../../components/errorSamePlaceReportList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ErrorSamePlaceReportListContainer = (props) =>
	<ErrorSamePlaceReportList
		{...props}
	/>

const ErrorSamePlaceReportListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ErrorSamePlaceReportListContainer)

export default ErrorSamePlaceReportListContainerConnected
