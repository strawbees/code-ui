import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import {
	GRAY,
	RED,
	WHITE
} from 'src/constants/colors'

const Toggle = ({
	on,
	onLabel,
	offLabel,
	onChange
}) =>
	<div className={`root toggle ${on ? 'on' : 'off'}`}>
		<style jsx>{`
			.root {
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				background-color: ${tinycolor(WHITE).toRgbString()};
				border-radius: 2rem;
				padding: 0.2rem 0.5rem;
			}
			.switch {
				width: 1.5rem;
				height: 0.8rem;
				position: relative;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.switch .checkbox {
				display: block;
				margin: 0;
				padding: 0;
				border: 0;
				box-sizing: border-box;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom : 0;
				width: 100%;
				height: 100%;
				opacity: 0;
				cursor: pointer;
			}
			.switch .track {
				width: calc(100% - 0.8rem);
				margin: 0 0.4rem;
				height: 0.4rem;
				box-sizing: border-box;
				background-color: ${tinycolor(GRAY).setAlpha(0.5).toRgbString()};
				border-radius: 1.5rem;
				transition: background-color 0.2s;
			}
			.root.on .switch .track {
				background-color: ${tinycolor(RED).setAlpha(0.5).toRgbString()};
			}
			.switch .pin {
				position: absolute;
				left: 0;
				top: 0;
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 0.8rem;
				box-sizing: border-box;
				background-color: ${tinycolor(GRAY).toRgbString()};
				transition: left 0.2s, background-color 0.2s;
			}
			.root.on .switch .pin {
				left: calc(100% - 0.8rem);
				background-color: ${tinycolor(RED).toRgbString()};
			}
			.label {
				font-size: 0.65rem;
				text-transform: uppercase;
				letter-spacing: 0.025rem;
			}
			.offLabel {
				margin-right: 0.25rem;
			}
			.onLabel {
				margin-left: 0.25rem;
			}
		`}</style>
		{offLabel &&
			<button className="label offLabel" onClick={() => onChange(false)}>
				<S value={offLabel}/>
			</button>
		}
		<div className="switch">
			<div className="track"></div>
			<div className="pin"></div>
			<input
				className="checkbox"
				name="on"
				type="checkbox"
				checked={on}
				onChange={() => onChange(!on)}
			/>
		</div>
		{onLabel &&
			<button className="label onLabel" onClick={() => onChange(true)}>
				<S value={onLabel}/>
			</button>
		}
	</div>

Toggle.propTypes = {
	on       : PropTypes.bool,
	onLabel  : PropTypes.string,
	offLabel : PropTypes.string,
	onChange : PropTypes.func,
}

export default Toggle
