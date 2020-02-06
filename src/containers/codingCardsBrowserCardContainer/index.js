import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import CodingCardsBrowserCard from 'src/components/codingCardsBrowserCard'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const CodingCardsBrowserCardContainer = (props) =>
	<CodingCardsBrowserCard {...props}/>

CodingCardsBrowserCard.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
	id : PropTypes.string,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CodingCardsBrowserCardContainer)
