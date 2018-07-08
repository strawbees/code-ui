import { connect } from 'react-redux'
import StrawbeesCloudConnect from 'src/components/strawbeesCloudConnect'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const StrawbeesCloudConnectContainer = (props) =>
	<StrawbeesCloudConnect
		{...props}
	/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StrawbeesCloudConnectContainer)
