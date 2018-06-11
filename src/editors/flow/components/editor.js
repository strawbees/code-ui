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
				overflow: hidden;
			}
			.root :global(> *:nth-child(1)) {
				width: 12rem;
			}
			.root :global(> *:nth-child(2)) {
				flex-grow: 1;
			}
			@media (max-width: 600px) {
				.root :global(> *:nth-child(1)) {
					width: 3.75rem;
				}
			}
		`}</style>
		<SideMenuContainer />
		<WorkspaceContainer />
	</div>


export default Editor
