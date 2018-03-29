import PropTypes from 'prop-types'
import Link from 'src/components/link'
import LocalesMenuContainer from 'src/containers/localesMenuContainer'

const Header = ({
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
	</div>

Header.propTypes = {
	homeUrl    : PropTypes.string,
	flowUrl    : PropTypes.string,
	scratchUrl : PropTypes.string,
	textUrl    : PropTypes.string,
}

export default Header
