import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import rawNodes from 'src/editors/flow/data/nodes.json'
import rawCategories from 'src/editors/flow/data/categories.json'
import Editor from 'src/editors/flow/components/editor'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class EditorContainer extends React.Component {
	constructor(props) {
		super(props)
		const {
			setNodeDefinitions,
			setCategoryDefinitions,
		} = props
		setNodeDefinitions(rawNodes)
		setCategoryDefinitions(rawCategories)
	}
	componentDidMount() {
		// Load initial source
		const {
			refEditorSource,
			setSource
		} = this.props
		setSource(refEditorSource)
	}
	componentDidUpdate({ source : prevSource }) {
		// pass up the source when it changes internally
		const {
			source,
			onSourceChange
		} = this.props
		if (source !== prevSource) {
			onSourceChange(source)
		}
	}
	render() {
		return (
			<Editor {...this.props}/>
		)
	}
}

EditorContainer.propTypes = {
	// Own props
	onSourceChange         : PropTypes.func,
	refEditorSource        : PropTypes.array,
	// Redux props
	setNodeDefinitions     : PropTypes.func,
	setCategoryDefinitions : PropTypes.func,
	source                 : PropTypes.array,
	setSource              : PropTypes.func,
}


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorContainer)
