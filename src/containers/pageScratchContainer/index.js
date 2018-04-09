import { connect } from 'react-redux'
import ScratchEditor from 'src/components/editors/scratch'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ScratchEditor)
