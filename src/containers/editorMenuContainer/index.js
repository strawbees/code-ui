import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import EditorMenu from 'src/components/editorMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const EditorMenuContainer = (props) =>
	<EditorMenu {...props}/>

EditorMenuContainer.propTypes = {
	disabled : PropTypes.bool
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorMenuContainer)
