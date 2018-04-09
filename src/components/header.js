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
				background-color: ${tinycolor(BLUE).setAlpha(0.5).toRgbString()};
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
		<Link to={`${scratchUrl}?p=3w43w4w4`}>
			scratch?p/
		</Link>
		<Link to={textUrl}>
			text/
		</Link>
		<LocalesMenuContainer />
		{editorMenu &&
			<EditorMenuContainer />
		}
	</div>

Header.propTypes = {
	editorMenu : PropTypes.bool,
	homeUrl    : PropTypes.string,
	flowUrl    : PropTypes.string,
	scratchUrl : PropTypes.string,
	textUrl    : PropTypes.string,
}

export default Header
