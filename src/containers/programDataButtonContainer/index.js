import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProgramButton from 'src/components/programButton'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ProgramDataButtonContainer = props =>
	<ProgramButton {...props} />

ProgramDataButtonContainer.propTypes = {
	type    : PropTypes.string,
	name    : PropTypes.string,
	onClick : PropTypes.func,
	source  : PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string
	]),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ProgramDataButtonContainer)
