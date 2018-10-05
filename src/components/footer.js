import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Package from 'root/package.json'
import Link from 'src/components/link'
import BoardsStatusContainer from 'src/containers/boardsStatusContainer'
import {
	PINK,
	WHITE,
} from 'src/constants/colors'

const Footer = ({
	cookiePolicyTitle,
	privacyPolicyTitle,
	termsOfUseTitle,
	cookiePolicyUrl,
	privacyPolicyUrl,
	termsOfUseUrl,
}) =>
	<div className='root footer'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 0.5rem;
				background-color: ${tinycolor(PINK).setAlpha(0.75).toRgbString()};
				position: relative;
			}
			.root :global(>.boardsStatus) {
				margin-left: -0.5rem;
			}

			.links {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
			}
			.links {
				color: ${WHITE};
				font-size: 0.7rem;
				font-weight: bold;
			}
			.links :global(a){
				text-decoration: none;
			}
			.links :global(>*){
				margin-right: 0.5rem;
			}
			.links :global(>*:last-child){
				margin-right: 0;
			}
			.links .copyright {
				font-weight: normal;
			}
			.version {
				position: absolute;
				bottom: 0;
				right: 1px;
				font-family: Code;
				font-size: 6px;
				color: rgba(255,255,255,0.3);
			}
			@media (max-width: 650px) {
				.links {
					font-size: 0.6rem;
				}
				.links :global(>*){
					margin-right: 0.25rem;
				}
				.links .copyright {
					display: none;
				}
			}
		`}</style>
		<BoardsStatusContainer />
		<div className='links'>
			<Link to={cookiePolicyUrl}>
				{cookiePolicyTitle}
			</Link>
			<Link to={privacyPolicyUrl}>
				{privacyPolicyTitle}
			</Link>
			<Link to={termsOfUseUrl}>
				{termsOfUseTitle}
			</Link>
			<div className='copyright'>
				© {(new Date()).getFullYear()} Strawbees AB
			</div>
		</div>
		<div className='version'>
			{Package.version}
		</div>
	</div>

Footer.defaultProps = {}

Footer.propTypes = {
	cookiePolicyTitle  : PropTypes.string,
	privacyPolicyTitle : PropTypes.string,
	termsOfUseTitle    : PropTypes.string,
	cookiePolicyUrl    : PropTypes.string,
	privacyPolicyUrl   : PropTypes.string,
	termsOfUseUrl      : PropTypes.string,
}

export default Footer
