import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class SourceSyncManager extends React.Component {
	componentDidUpdate({
		source : prevSource,
		refEditorSource : prevRefEditorSource,
	}) {
		const {
			source,
			setSource,
			refEditorSource,
			setRefEditorSource
		} = this.props
		if (source !== prevSource &&
			source !== refEditorSource) {
			setRefEditorSource(source)
		}
		if (refEditorSource !== prevRefEditorSource &&
			refEditorSource !== source) {
			setSource(refEditorSource)
		}
	}
	render() {
		return null
	}
}

SourceSyncManager.propTypes = {
	refEditorSource    : PropTypes.array,
	setRefEditorSource : PropTypes.func,
	source             : PropTypes.array,
	setSource          : PropTypes.func,
}


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SourceSyncManager)
