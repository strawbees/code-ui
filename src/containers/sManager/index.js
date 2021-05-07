import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Markdown from 'src/components/markdown'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SManager = ({
	string,
	onChange,
	render = true,
	markdown = false,
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
const sManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SManager)

export default sManagerConnected
