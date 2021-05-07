import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import shallowCompareArrays from 'src/utils/shallowCompareArrays'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class SourceSyncManager extends React.Component {
	componentDidMount() {
		const {
			source,
			setSource,
			refEditorSource,
		} = this.props
		if (refEditorSource && !shallowCompareArrays(refEditorSource, source)) {
			setSource(refEditorSource)
		}
	}

	componentDidUpdate({
		source : prevSource,
		refEditorSource : prevRefEditorSource,
	}) {
		const {
			source,
			setSource,
			refEditorSource,
			setRefEditorSource,
		} = this.props
		if (!shallowCompareArrays(source, prevSource) &&
			!shallowCompareArrays(source, refEditorSource)) {
			setRefEditorSource(source)
		}
		if (!shallowCompareArrays(refEditorSource, prevRefEditorSource) &&
			!shallowCompareArrays(refEditorSource, source)) {
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

const sourceSyncManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SourceSyncManager)

export default sourceSyncManagerConnected
