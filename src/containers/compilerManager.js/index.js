import React from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class CompilerManager extends React.Component {
	componentDidUpdate(prevProps) {

	}

	render() {
		return null
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CompilerManager)
