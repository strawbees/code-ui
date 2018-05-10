import React from 'react'
import PropTypes from 'prop-types'
import SideMenuContainer from 'src/editors/flow/containers/sideMenuContainer'
import WorkspaceContainer from 'src/editors/flow/containers/workspaceContainer'

class Editor extends React.Component {
	componentDidMount() {
		const {
			source,
			setSource
		} = this.props
		setSource(source)
	}
	render() {
		return (
			<div className='root editor'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: row;
						height: 100%;
						position: relative;
					}
					.root :global(> *:nth-child(2)) {
						width: 12rem;
					}
					.root :global(> *:nth-child(2)) {
						flex-grow: 1;
					}

				`}</style>
				<SideMenuContainer />
				<WorkspaceContainer/>
			</div>
		)
	}
}

Editor.propTypes = {
	source         : PropTypes.object,
	setSource      : PropTypes.func,
	onSourceChange : PropTypes.func,
}


export default Editor
