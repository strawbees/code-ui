import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import generalIcons from 'src/editors/flow/assets/icons/general'
import tinycolor from 'tinycolor2'
import {
	WHITE,
	BLACK,
} from 'src/constants/colors'

const RemoveItemButton = ({ onClick }) =>
	<button className='root removeItemButton'
		onClick={onClick}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 1rem;
				height: 1rem;
				border-radius: 1rem;
				fill: ${BLACK};
				background-color: ${tinycolor(WHITE).toRgbString()};
				outline: none;
				transition: transform 0.1s;
			}
			.root:hover, .root:focus {
				transform: scale3d(1.1,1.1,1.1);
			}
		`}</style>
		<SvgIcon icon={generalIcons.minus} />
	</button>

RemoveItemButton.propTypes = {
	onClick : PropTypes.func,
}

export default RemoveItemButton
