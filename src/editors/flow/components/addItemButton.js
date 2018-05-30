import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import generalIcons from 'src/editors/flow/assets/icons/general'
import tinycolor from 'tinycolor2'
import {
	RED,
	GRAY,
	WHITE,
	BLACK
} from 'src/constants/colors'

const AddItemButton = ({ onClick }) =>
	<button className='root addItemButton'
		onClick={onClick}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 1.25rem;
				height: 1.25rem;
				border-radius: 1.5rem;
				fill: ${BLACK};
				background-color: ${tinycolor(WHITE).toRgbString()};
				outline: none;
				transition: transform 0.2s;
			}
			.root:hover, .root:focus {
				transform: scale3d(1.2,1.2,1.2);
			}
		`}</style>
		<SvgIcon icon={generalIcons.plus} />
	</button>

AddItemButton.propTypes = {
	onClick : PropTypes.func
}

export default AddItemButton
