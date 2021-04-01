import { connect } from 'react-redux'
import ErrorSamePlaceList from '../../components/errorSamePlaceList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ErrorSamePlaceListContainer = (props) =>
	<ErrorSamePlaceList
		{...props}
	/>

const ErrorSamePlaceListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ErrorSamePlaceListContainer)

export default ErrorSamePlaceListContainerConnected
