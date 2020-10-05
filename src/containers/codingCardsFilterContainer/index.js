import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import CodingCardsFilter from 'src/components/codingCardsFilter'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const CodingCardsFilterContainer = (props) =>
	<CodingCardsFilter {...props}/>

CodingCardsFilter.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
}

const codingCardsFilterContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CodingCardsFilterContainer)

export default codingCardsFilterContainerConnected
