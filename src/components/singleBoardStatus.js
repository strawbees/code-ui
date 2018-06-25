import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'
import icons from 'src/assets/icons/boardStatus'
import {
	WHITE,
	BLACK,
	RED,
	GREEN,
	BLUE,
	YELLOW
} from 'src/constants/colors'

const SingleBoardStatus = ({
	status,
	scale,
	labelKey,
}) => <div className={`root singleBoardStatus ${status}`}>
	<style jsx>{`
		.root {
			position: relative;
			transform: translate3d(0,0,0);
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.icon {
			width: ${scale * 2.6}rem;
			height: ${scale * 1.8}rem;
			overflow: hidden;
			position: relative;
		}
		.icon :global(.svgIcon) {
			width: ${scale * 2.6}rem;
			height: ${scale * 1.8}rem;
			position: absolute;
			top: 0;
			left: ${scale * -0.2}rem;
		}
		.icon.notConnected,
		.icon.problem {
			fill: ${tinycolor(RED).toRgbString()};
		}
		.icon.ok {
			fill: ${tinycolor(GREEN).toRgbString()};
		}
		.icon.bootloader {
			fill: ${tinycolor(BLUE).toRgbString()};
		}
		.icon.busy {
			fill: ${tinycolor(YELLOW).toRgbString()};
		}
		.text {
			font-size: ${scale * 0.8}rem;
			color: ${tinycolor(BLACK).toRgbString()};
			background-color: ${tinycolor(WHITE).setAlpha(0.75).toRgbString()};
			padding: 0 ${scale * 0.5}rem 0 ${scale * 1.2}rem;
			border-radius: ${scale * 1}rem;
			margin-left: ${scale * -1.2}rem;
		}
		@media (max-width: 600px) {
			.text {
				display: none;
			}
		}
	`}</style>
	<div className={`icon ${status}`}>
		<SvgIcon
			className='base'
			icon={icons.base}
		/>
		<SvgIcon
			className={status}
			icon={(status === 'ok'
				|| status === 'bootloader'
				|| status === 'busy'
				|| status === 'problem')
				? icons.statusCircle
				: icons.statusX
			}
		/>
	</div>

	<div className='text'>
		<S value={labelKey || `ui.board.status.${status}`}/>
	</div>
</div>

SingleBoardStatus.defaultProps = {
	status : 'busy',
	scale  : 1
}

SingleBoardStatus.propTypes = {
	id     : PropTypes.string,
	status : PropTypes.oneOf([
		'notConnected',
		'ok',
		'bootloader',
		'busy',
		'problem',
	]),
	scale    : PropTypes.number,
	labelKey : PropTypes.string,
}


export default SingleBoardStatus
