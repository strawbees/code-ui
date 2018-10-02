import { connect } from 'react-redux'
import Markdown from 'react-remarkable'
import PropTypes from 'prop-types'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SManager = ({
	string,
	onChange,
	render = true,
	markdown = false
}) => {
	if (onChange) {
		onChange(string)
	}
	if (render) {
		if (markdown) {
			return <Markdown source={string}/>
		}
		return string || ''
	}
	return null
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
