import { connect } from 'react-redux'
import KeyPress from '../../../components/nodeParts/KeyPress'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const KeyPressContainer = (props) =>
	<KeyPress
		{...props}
	/>

const KeyPressContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(KeyPressContainer)

export default KeyPressContainerConnected
