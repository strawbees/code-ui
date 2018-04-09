import { connect } from 'react-redux'
import React from 'react'
import EditorMenu from 'src/components/editorMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class EditorMenuContainer extends React.Component {
	state = {}
	static getDerivedStateFromProps({ programNotInitialized, initializeProgram }) {
		if (programNotInitialized) {
			initializeProgram()
		}
		return null
	}
	render() {
		return <EditorMenu {...this.props}/>
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorMenuContainer)
