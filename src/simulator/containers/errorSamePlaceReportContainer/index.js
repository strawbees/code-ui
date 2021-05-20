import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ErrorSamePlaceReport from '../../components/errorSamePlaceReport'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ErrorSamePlaceReportContainer = (props) =>
	<ErrorSamePlaceReport
		{...props}
	/>

ErrorSamePlaceReportContainer.propTypes = {
	place : PropTypes.number,
}

const ErrorSamePlaceReportContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ErrorSamePlaceReportContainer)

export default ErrorSamePlaceReportContainerConnected
