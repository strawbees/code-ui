import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import {
	PINK,
	YELLOW,
	BLUE
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
				font-size: 0.7rem;
				text-transform: uppercase;
				letter-spacing: 0.05rem;
				background-color: white;
				border-radius: 2rem;
				padding: 0.2rem 0.4rem;
			}
			.switch {
				width: 2.25rem;
				height: 1.25rem;
				position: relative;
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
				position: absolute;
				left: 0;
				top: 0;
				width: calc(100% - 0.2rem);
				height: calc(100% - 0.4rem);
				box-sizing: border-box;
				background-color: ${tinycolor(PINK).setAlpha(0.5).toRgbString()};
				margin: 0.2rem 0.1rem;
				border-radius: 1.5rem;
			}
			.switch .pin {
				position: absolute;
				left: 0;
				top: 0;
				width: 1.25rem;
				height: 1.25rem;
				border-radius: 1.25rem;
				box-sizing: border-box;
				background-color: ${tinycolor(YELLOW).toRgbString()};
				border: solid 0.2rem ${tinycolor(PINK).setAlpha(0.5).toRgbString()};
			}
			.root.on .switch .pin {
				right: 0;
				left: auto;
			}
			.root.on .switch .track {
				background-color: ${tinycolor(BLUE).setAlpha(0.5).toRgbString()};
			}
			.label {
				cursor: pointer;
			}
			.offLabel {
				margin-right: 0.5rem;
			}
			.onLabel {
				margin-left: 0.5rem;
			}
		`}</style>
		{offLabel &&
			<div className="label offLabel" onClick={() => onChange(false)}>
				<S value={offLabel}/>
			</div>
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
			<div className="label onLabel" onClick={() => onChange(true)}>
				<S value={onLabel}/>
			</div>
		}
	</div>

Toggle.propTypes = {
	on       : PropTypes.bool,
	onLabel  : PropTypes.string,
	offLabel : PropTypes.string,
	onChange : PropTypes.func,
}

export default Toggle
