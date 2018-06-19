import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import {
	GRAY,
	GREEN,
	PINK,
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
				width: 2.25rem;
				height: 1rem;
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
				background-color: ${tinycolor(GRAY).toRgbString()};
				border-radius: 1.5rem;
			}
			.switch .pin {
				position: absolute;
				left: 0;
				top: 0;
				width: 1rem;
				height: 1rem;
				border-radius: 1rem;
				box-sizing: border-box;
				background-color: ${tinycolor(GREEN).setAlpha(0.7).toRgbString()};
				transition: left 0.2s, background-color 0.2s;
			}
			.root.on .switch .pin {
				left: calc(100% - 1rem);
				background-color: ${tinycolor(PINK).setAlpha(0.7).toRgbString()};
			}
			.label {
				font-size: 0.7rem;
				text-transform: uppercase;
				letter-spacing: 0.05rem;
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
