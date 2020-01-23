import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import CodingCardsFilterItem from 'src/components/codingCardsFilterItem'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const CodingCardsFilterItemContainer = (props) =>
	<CodingCardsFilterItem {...props}/>

CodingCardsFilterItem.propTypes = {
	id       : PropTypes.string,
	selected : PropTypes.bool,
	onClick  : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CodingCardsFilterItemContainer)
