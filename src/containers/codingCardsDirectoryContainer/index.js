import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import CodingCardsDirectory from 'src/components/codingCardsDirectory'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const CodingCardsDirectoryContainer = (props) =>
	<CodingCardsDirectory {...props}/>

CodingCardsDirectory.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CodingCardsDirectoryContainer)
