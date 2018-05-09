import SideMenuContainer from 'src/editors/flow/containers/sideMenuContainer'

const Editor = (props) =>
	<div className='root editor'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				height: 100%;
				position: relative;
			}
			.root :global(> *:first-child) {
				width: 12rem;
			}

		`}</style>
		<SideMenuContainer />
	</div>

export default Editor
