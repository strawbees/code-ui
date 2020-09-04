import { connect } from 'react-redux'
import Wave from '../../../components/nodeIcons/wave'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const WaveContainer = (props) =>
	<Wave
		{...props}
	/>

const waveContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(WaveContainer)

export default waveContainerConnected
