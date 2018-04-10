import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import EditorMenu from 'src/components/editorMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class EditorMenuContainer extends React.Component {
	state = {}
	static getDerivedStateFromProps({ notInitialized, initializeProgram }) {
		if (notInitialized) {
			initializeProgram()
		}
		return null
	}
	render() {
		return <EditorMenu {...this.props}/>
	}
}

EditorMenuContainer.propTypes = {
	initializeProgram : PropTypes.func,
	notInitialized    : PropTypes.bool
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorMenuContainer)
