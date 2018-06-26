import PropTypes from 'prop-types'
import Link from 'src/components/link'
import S from 'src/containers/sManager'

const ProgramCreator = ({
	flowUrl,
	blockUrl,
	textUrl,
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
			<Link to={flowUrl}>
				<S value='flow.base.title'/>
			</Link>
			<Link to={blockUrl}>
				<S value='block.base.title'/>
			</Link>
			<Link to={textUrl}>
				<S value='text.base.title'/>
			</Link>
		</div>
	</div>

ProgramCreator.propTypes = {
	flowUrl  : PropTypes.string,
	blockUrl : PropTypes.string,
	textUrl  : PropTypes.string,
}

export default ProgramCreator
