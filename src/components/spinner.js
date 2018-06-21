import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import {
	BLUE,
	YELLOW
} from 'src/constants/colors'

const Spinner = ({
	status
}) =>
	<div className={`root spinner ${status}`}>
		<style jsx>{`
			.root {
				min-width: 2.5rem;
				min-height: 1.5rem;
			}
			.circles {
				width: 1rem;
				height: 1rem;
				margin: 0.25rem 0.75rem;
				position: relative;
				isolation: isolate;
			}
			.circles > * {
				position: absolute;
				border-radius: 1rem;
				width: 100%;
				height: 100%;
				mix-blend-mode: multiply;
				animation-duration: 2s;
  				animation-name: slide;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
			}
			.circles > .a {
				background-color: ${tinycolor(YELLOW).toRgbString()};
				animation-direction: normal;
			}
			.circles > .b {
				background-color: ${tinycolor(BLUE).toRgbString()};
				animation-direction: reverse;
			}
			@keyframes slide {
				0% { transform: translate3d(0,0,0); }
				25% { transform: translate3d(40%,0,0) scale3d(0.6,0.6,1); }
				50% { transform: translate3d(0,0,0); }
				75% { transform: translate3d(-40%,0,0) scale3d(0.6,0.6,1); }
				100% { transform: translate3d(0,0,0); }
			}
		`}</style>
		<div className='circles'>
			<div className='a'/>
			<div className='b'/>
		</div>
	</div>

Spinner.defaultProps = {
	status : 'iddle'
}
Spinner.propTypes = {
	status : PropTypes.oneOf(['iddle', 'success', 'fail']),
}

export default Spinner
