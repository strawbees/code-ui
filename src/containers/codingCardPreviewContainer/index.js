import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import CodingCardPreview from 'src/components/codingCardPreview'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const CodingCardPreviewContainer = (props) =>
	<CodingCardPreview {...props}/>

CodingCardPreview.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
	id      : PropTypes.string,
	onClick : PropTypes.func
}

const codingCardPreviewContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CodingCardPreviewContainer)

export default codingCardPreviewContainerConnected
