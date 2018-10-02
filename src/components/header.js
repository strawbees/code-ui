import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { BLUE } from 'src/constants/colors'
import HelpMenuContainer from 'src/containers/helpMenuContainer'
import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import UserHeaderAvatarContainer from 'src/containers/userHeaderAvatarContainer'
import LocalesMenuContainer from 'src/containers/localesMenuContainer'
import EditorMenuContainer from 'src/containers/editorMenuContainer'
import logoIcon from 'src/assets/icons/logos/strawbeesCode.svg'
import logoCompactIcon from 'src/assets/icons/logos/strawbeesCodeCompact.svg'

const Header = ({
	editorMenu,
	homeUrl,
}) =>
	<div className='root header'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: ${tinycolor(BLUE).setAlpha(0.75).toRgbString()};
				position: relative;
				width: 100%;
				padding: 0 0.5rem;
			}
			.root :global(> .dropdownMenu) {
				height: 100%;
			}
			.root :global(.editorMenu) {
				flex: 1;
				height: 100%;
			}
			.root .logo :global(>.svgIcon) {
				width: 11rem;
				height: 2rem;
				margin-top: -0.3rem;
			}
			.root .logo-compact :global(>.svgIcon) {
				display: none;
				height: 2.5rem;
				width: 3.4rem;
			}
			.root .logo :global(>.svgIcon),
			.root .logo-compact :global(>.svgIcon) {
				margin-right: 0.5rem;
			}
			.root :global(>.userHeaderAvatar) {
				margin-right: 0.3rem;
				height: 100%;
			}
			@media (max-width: 650px) {
				.root {
					padding: 0 0.5rem;
				}
				.root .logo :global(>.svgIcon) {
					display: none;
				}
				.root .logo-compact :global(>.svgIcon) {
					display: inherit;
				}
			}
			@media (max-width: 450px) {
				.root .logo :global(>.svgIcon),
				.root .logo-compact :global(>.svgIcon) {
					margin-right: 0;
				}
			}
		`}</style>

		<Link to={homeUrl}>
			<div className='logo'>
				<SvgIcon icon={logoIcon} />
			</div>
			<div className='logo-compact'>
				<SvgIcon icon={logoCompactIcon} />
			</div>
		</Link>

		<EditorMenuContainer
			disabled={!editorMenu}
		/>

		{/* {!editorMenu &&
			<HelpMenuContainer />
		}

		<div className='editor'>
			{editorMenu &&
				<EditorMenuContainer />
			}
		</div>
		*/}
		<UserHeaderAvatarContainer />
		<LocalesMenuContainer />
	</div>

Header.propTypes = {
	editorMenu : PropTypes.bool,
	homeUrl    : PropTypes.string,
}

export default Header
