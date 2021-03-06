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
				overscroll-behavior: none;
				z-index: 1;
			}
			.root :global(> *:nth-child(1)) {
				width: 12.5rem;
			}
			.root :global(> *:nth-child(2)) {
				width: calc(100% - 12.5rem);
			}
			@media (max-width: 600px) {
				.root :global(> *:nth-child(1)) {
					width: 3.75rem;
				}
				.root :global(> *:nth-child(2)) {
					width: calc(100% - 3.75rem);
				}
			}
		`}</style>
		<SideMenuContainer />
		<WorkspaceContainer />
	</div>

export default Editor
