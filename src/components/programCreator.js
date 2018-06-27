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
		<Link to={'/flow/?data=N4IgdghgtgpiBcIDK0AOAbGACVAnA9gOa7QgA0IAlgCYJgCu66FAzvvbgMZzwDaoNBCAAMAfXLhoPEJ0pd6lAC4AVdpwAWARglh81GAElaiKBADWMAJ4BaRWvUSAHggDsmipYQBmAKwA6LwBOYQA2ACYfClQIElhFGFwWBFAMCG4hAAkQAF9ssgFjEE1xCkhYIUxqbVK9Q0LKp28Qrw8EABZ-LzCADk0IqJipeMTkkHRKQnVFITE-dmmo9DTpABkAURy8gqEwkslyxEqwnVqjCphaCmd4LxcQ1vgwzRcAnr7IkGjYmGGk+FBxpNpohZvMJKl0ogAEobXL5KiFLx7MrSADuEAAbjBquBToV0VjGvAfIFAg9NCEtgihG1kVIhCwEhj8ABZfB2XA43T6M6IRm4ZnWKDs-C4IndMJtB6+AbfX6jVD4FhKSj4MBCJFzegLT5LSHINZQgBqAHlRCyTcoTVDRNo4dtED46QcQCQwNR8FBKAAvBJcvFCN0er2+sVXBA+FzdaVtSnwwSIELO6ScNWKSgMdgsJBM-D+nmFVNgdOZ+gsaz85nitouB4RF7CWPdFwfL5DBJ-UAsVAwC5CJ1anUQ6RIQ2m82W62iY65AC6FEUlh7QgAZuh8KickA'}>
			Sample
		</Link>
	</div>

ProgramCreator.propTypes = {
	flowUrl  : PropTypes.string,
	blockUrl : PropTypes.string,
	textUrl  : PropTypes.string,
}

export default ProgramCreator
