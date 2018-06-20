import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'
import icons from 'src/assets/icons/boardStatus'
import { WHITE, BLACK } from 'src/constants/colors'

const SingleBoardStatus = ({
	status
}) =>
	<div className={`root singleBoardStatus ${status}`}>
		<style jsx>{`
			.root {
				position: relative;
				transform: translate3d(0,0,0);
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.root :global(.svgIcon) {
				width: 1.75rem;
				height: 1.75rem;
			}
			.text {
				font-size: 0.8rem;
				color: ${tinycolor(BLACK).toRgbString()};
				background-color: ${tinycolor(WHITE).setAlpha(0.5).toRgbString()};
				padding: 0 0.5rem 0 1.25rem;
				border-radius: 1rem;
				margin-left: -1rem;
			}
			@media (max-width: 600px) {
				.text {
					display: none;
				}
			}
		`}</style>
		<SvgIcon icon={icons[status]}/>
		<div className='text'>
			<S value={`ui.board_status.${status}`}/>
		</div>
	</div>

SingleBoardStatus.defaultProps = {
	status : 'busy'
}

SingleBoardStatus.propTypes = {
	id     : PropTypes.string,
	status : PropTypes.oneOf(['notConnected', 'ok', 'busy', 'problem']),
}


export default SingleBoardStatus
