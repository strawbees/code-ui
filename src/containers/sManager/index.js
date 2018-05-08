import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SManager = ({ string, onChange, render = true }) => {
	if (onChange) {
		onChange(string)
	}
	return render && (string || '')
}
SManager.propTypes = {
	onChange : PropTypes.func,
	render   : PropTypes.bool,
	value    : PropTypes.string,
	string   : PropTypes.string,
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SManager)
