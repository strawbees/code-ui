import PropTypes from 'prop-types'
import Link from 'src/components/link'
import LocalesMenu from 'src/components/localesMenu'

const Header = ({
	homeUrl,
	flowUrl,
	scratchUrl,
	textUrl,
	propsLocalesMenu
}) =>
	<div className='root header'>
		<style jsx>{`
			.wrapper {
				display: flex;
				flex-direction: row;
			}
		`}</style>
		<div className='wrapper'>
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
			<LocalesMenu {...propsLocalesMenu}/>
		</div>
	</div>

Header.propTypes = {
	homeUrl          : PropTypes.string,
	flowUrl          : PropTypes.string,
	scratchUrl       : PropTypes.string,
	textUrl          : PropTypes.string,
	propsLocalesMenu : PropTypes.shape(LocalesMenu.propTypes)
}

export default Header
