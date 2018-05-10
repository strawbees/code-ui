import React from 'react'
import PropTypes from 'prop-types'

class Workspace extends React.Component {
	constructor(props) {
		super(props)
		this.dropArea = React.createRef()
	}
	componentDidMount() {
		const {
			registerGetDropAreaRect
		} = this.props
		registerGetDropAreaRect(
			() => this.dropArea.current.getBoundingClientRect()
		)
	}
	render() {
		return (
			<div className='root workspace' ref={this.dropArea}>
				<style jsx>{`
					.root {
						background-color: red;
						box-sizing: border-box;
						border: solid 3px yellow;
					}
				`}</style>
			</div>
		)
	}
}

Workspace.propTypes = {
	registerGetDropAreaRect : PropTypes.func
}

export default Workspace
