import React from 'react'
import { connect } from 'react-redux'
import Editor from 'src/editors/flow/components/editor'
import SourceSyncManager from 'src/editors/flow/containers/sourceSyncManager'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const EditorContainer = () =>
	<React.Fragment>
		<SourceSyncManager/>
		<Editor/>
	</React.Fragment>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorContainer)
