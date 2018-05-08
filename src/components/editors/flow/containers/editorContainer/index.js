import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import rawNodes from 'src/components/editors/flow/data/nodes.json'
import rawCategories from 'src/components/editors/flow/data/categories.json'
import Editor from 'src/components/editors/flow/components/editor'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class EditorContainer extends React.Component {
	constructor(props) {
		super(props)
		const {
			setFlowEditorNodeDefinitions,
			setFlowEditorCategoryDefinitions,
		} = props
		setFlowEditorNodeDefinitions(rawNodes)
		setFlowEditorCategoryDefinitions(rawCategories)
	}
	render() {
		return (
			<Editor />
		)
	}
}

EditorContainer.propTypes = {
	setFlowEditorNodeDefinitions     : PropTypes.func,
	setFlowEditorCategoryDefinitions : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorContainer)
