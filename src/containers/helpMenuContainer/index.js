import { connect } from 'react-redux'
import React from 'react'
import HelpMenu from 'src/components/helpMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const HelpMenuContainer = (props) =>
	<HelpMenu {...props}/>

const helpMenuContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(HelpMenuContainer)

export default helpMenuContainerConnected
