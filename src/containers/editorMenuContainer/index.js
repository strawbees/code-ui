import { connect } from 'react-redux'
import React from 'react'
import EditorMenu from 'src/components/editorMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const EditorMenuContainer = (props) =>
	<EditorMenu {...props}/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorMenuContainer)
