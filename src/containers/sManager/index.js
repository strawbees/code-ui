import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SContainer = ({ string, onChange, render = true }) => {
	if (onChange) {
		onChange(string)
	}
	return render && (string || '')
}
SContainer.propTypes = {
	string : PropTypes.string
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SContainer)
