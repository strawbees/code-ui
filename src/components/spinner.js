import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import {
	BLUE,
	YELLOW
} from 'src/constants/colors'

const Spinner = ({
	scale
}) =>
	<div className='root spinner'>
		<style jsx>{`
			.root {
				min-width: ${scale * 2.5}rem;
				min-height: ${scale * 1.5}rem;
			}
			.circles {
				width: ${scale * 1}rem;
				height: ${scale * 1}rem;
				margin: ${scale * 0.25}rem ${scale * 0.75}rem;
				position: relative;
				isolation: isolate;
				opacity: 0.7;
			}
			.circles > * {
				position: absolute;
				border-radius: ${scale * 1}rem;
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
				animation-name: slide;
			}
			.circles > .b {
				background-color: ${tinycolor(BLUE).toRgbString()};
				animation-name: slide_alt;

			}
			@keyframes slide {
				0% { transform:   translate3d(0,0,0)    scale3d(1.0,1.0,1.0); }
				25% { transform:  translate3d(40%,0,0)  scale3d(0.6,0.6,1.0); }
				50% { transform:  translate3d(0,0,0)    scale3d(0.4,0.4,1.0); }
				75% { transform:  translate3d(-40%,0,0) scale3d(0.6,0.6,1.0); }
				100% { transform: translate3d(0,0,0)    scale3d(1.0,1.0,1.0); }
			}
			@keyframes slide_alt {
				0% { transform:   translate3d(0,0,0)    scale3d(0.4,0.4,0.4); }
				25% { transform:  translate3d(-40%,0,0)  scale3d(0.6,0.6,1.0); }
				50% { transform:  translate3d(0,0,0)    scale3d(1.0,1.0,1.0); }
				75% { transform:  translate3d(40%,0,0) scale3d(0.6,0.6,1.0); }
				100% { transform: translate3d(0,0,0)    scale3d(0.4,0.4,0.4); }
			}
		`}</style>
		<div className='circles'>
			<div className='a'/>
			<div className='b'/>
		</div>
	</div>

Spinner.defaultProps = {
	scale : 1
}
Spinner.propTypes = {
	scale : PropTypes.number,
}

export default Spinner
