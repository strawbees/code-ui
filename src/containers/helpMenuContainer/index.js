import { connect } from 'react-redux'
import React from 'react'
import HelpMenu from 'src/components/helpMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const HelpMenuContainer = (props) =>
	<HelpMenu {...props}/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(HelpMenuContainer)
