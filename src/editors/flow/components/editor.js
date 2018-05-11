import SideMenuContainer from 'src/editors/flow/containers/sideMenuContainer'
import WorkspaceContainer from 'src/editors/flow/containers/workspaceContainer'

const Editor = () =>
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
		<WorkspaceContainer />
	</div>


export default Editor
