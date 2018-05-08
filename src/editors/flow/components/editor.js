import SideMenuContainer from 'src/editors/flow/containers/sideMenuContainer'

const Editor = (props) =>
	<div className='root editor'>
		<style jsx>{`
			display: grid;
			grid-template-columns: 12rem auto;
			grid-template-rows: auto;
			height: 100%;
		`}</style>
		<SideMenuContainer />
	</div>

export default Editor
