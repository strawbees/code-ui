import PropTypes from 'prop-types'
import S from 'src/containers/sManager'

const ProgramCreator = ({
	createNewFlow,
	createNewScratch,
	createNewText,
}) =>
	<div className='root programCreator'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
			}
			.types {
				display: flex;
				flex-direction: row;
			}
		`}</style>
		<h3 className='title'>
			<S value='ui.program_creator.title'/>
		</h3>
		<div className='types'>
			<button onClick={createNewFlow}>
				<S value='flow.base.title'/>
			</button>
			<button onClick={createNewScratch}>
				<S value='scratch.base.title'/>
			</button>
			<button onClick={createNewText}>
				<S value='text.base.title'/>
			</button>
		</div>
	</div>

ProgramCreator.propTypes = {
	createNewFlow    : PropTypes.func,
	createNewScratch : PropTypes.func,
	createNewText    : PropTypes.func,
}

export default ProgramCreator
