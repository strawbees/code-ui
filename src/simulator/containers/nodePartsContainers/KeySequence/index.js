import { connect } from 'react-redux'
import KeySequence from '../../../components/nodeParts/KeySequence'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const KeySequenceContainer = (props) =>
	<KeySequence
		{...props}
	/>

const KeySequenceContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(KeySequenceContainer)

export default KeySequenceContainerConnected
