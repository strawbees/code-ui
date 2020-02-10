import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import CodingCardsBrowser from 'src/components/codingCardsBrowser'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const CodingCardsBrowserContainer = (props) =>
	<CodingCardsBrowser {...props}/>

CodingCardsBrowser.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CodingCardsBrowserContainer)
