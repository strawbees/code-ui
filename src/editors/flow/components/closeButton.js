import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import generalIcons from 'src/editors/flow/assets/icons/general'
import tinycolor from 'tinycolor2'
import {
	RED,
	GRAY,
	WHITE
} from 'src/constants/colors'

const CloseButton = ({ onClick }) =>
	<button className='root closeButton'
		onClick={onClick}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 1.5rem;
				border: solid 0.1rem ${tinycolor(WHITE).setAlpha(0.5).toRgbString()};
				fill: ${WHITE};
				background-color: ${tinycolor(GRAY).setAlpha(0.5).toRgbString()};
				outline: none;
			}
			.root:hover, .root:focus {
				background-color: ${tinycolor(RED).toRgbString()};
			}
		`}</style>
		<SvgIcon icon={generalIcons.close} />
	</button>

CloseButton.propTypes = {
	onClick : PropTypes.func
}

export default CloseButton
