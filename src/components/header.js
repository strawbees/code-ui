import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { BLUE } from 'src/constants/colors'
import Link from 'src/components/link'
import LocalesMenuContainer from 'src/containers/localesMenuContainer'
import EditorMenuContainer from 'src/containers/editorMenuContainer'

const Header = ({
	editorMenu,
	homeUrl,
	flowUrl,
	scratchUrl,
	textUrl
}) =>
	<div className='root header'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: ${tinycolor(BLUE).setAlpha(0.5).toRgbString()};
				position: relative;
				width: 100%;
				padding: 0 1rem;
			}
			.root .editor {
				flex: 1;
				height: 100%;
			}
			.root .editor :global(>*){
				height: 100%;
			}
		`}</style>

		<Link to={homeUrl}>
			home/
		</Link>
		<Link to={flowUrl}>
			flow/
		</Link>
		<Link to={scratchUrl}>
			scratch/
		</Link>
		<Link to={textUrl}>
			text/
		</Link>
		<div className='editor'>
			{editorMenu &&
				<EditorMenuContainer />
			}
		</div>
		<LocalesMenuContainer />
	</div>

Header.propTypes = {
	editorMenu : PropTypes.bool,
	homeUrl    : PropTypes.string,
	flowUrl    : PropTypes.string,
	scratchUrl : PropTypes.string,
	textUrl    : PropTypes.string,
}

export default Header
