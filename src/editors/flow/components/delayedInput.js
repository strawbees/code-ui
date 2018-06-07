import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import debounce from 'src/utils/debounce'
import { WHITE } from 'src/constants/colors'

let ID_FACTORY = 0
class DelayedInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			computedValue : props.value
		}
		this.debounceId = `DelayedInput${++ID_FACTORY}`
		this.input = React.createRef()
	}

	getSnapshotBeforeUpdate() {
		const { input } = this
		return {
			caret : input &&
				input.current &&
				input.current.selectionStart
		}
	}
	componentDidUpdate(prevProps, prevState, { caret }) {
		// handle external updates
		if (!this.cancelDebounce && this.props.value !== prevProps.value) {
			this.setState({ computedValue : this.props.value })
		}
		const { input } = this
		if (caret && input && input.current) {
			input.current.setSelectionRange(caret, caret)
		}
	}

	localUpdateValue = (e) => {
		const { value } = e.target
		this.setState({ computedValue : value })
		const {
			onChange,
		} = this.props
		this.debounceFn = () => {
			delete this.cancelDebounce
			onChange(value)
			debounce(`${this.debounceId}sync`, () => this.setState({ computedValue : this.props.value }), 10)
		}
		this.cancelDebounce = debounce(this.debounceId, this.debounceFn, 1000)
	}

	onKeyDown = (e) => {
		if (e.keyCode === 13) {
			if (this.cancelDebounce) {
				this.cancelDebounce()
				this.debounceFn()
				if (this.props.onEnter) {
					this.props.onEnter()
				}
			}
			if (this.props.blurOnEnter) {
				this.input.current.blur()
			}
		}
		if (e.keyCode === 27) {
			if (this.props.blurOnESC) {
				this.input.current.blur()
			}
		}
	}

	onKeyUp = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	render() {
		const {
			onKeyDown,
			onKeyUp,
		} = this
		const {
			computedValue,
		} = this.state
		const {
			autoResize,
			color,
		} = this.props
		const size = autoResize ? (computedValue ? computedValue.length : 1) : null
		return (
			<div className='root delayedInput'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: row;
						align-items: center;
						position: relative;
					}
					input {
						appearance: none;
						border: 0;
						padding: 0;
						border-radius: 0;
						display: block;
						vertical-align: middle;
						white-space: normal;
						min-width: 0;
						background: none;
						background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
						line-height: 1;
						font-family: 'Code', monospace;
						font-size: 0.8rem;
						text-align: center;
						padding: 0.1rem 0.2rem;
						outline: none;
						width: ${autoResize ? 'auto' : '100%'};
					}
					input:focus {
						background-color: ${tinycolor(color).toRgbString()};
					}
				`}</style>
				<input
					type='text'
					ref={this.input}
					value={computedValue}
					size={size}
					spellCheck='false'
					autoCorrect='off'
					onKeyUp={onKeyUp}
					onKeyDown={onKeyDown}
					onChange={this.localUpdateValue}
				/>
			</div>
		)
	}
}

DelayedInput.defaultProps = {
	autoResize  : false,
	blurOnEnter : false,
	color       : WHITE,
}

DelayedInput.propTypes = {
	value       : PropTypes.string,
	onChange    : PropTypes.func,
	onEnter     : PropTypes.func,
	autoResize  : PropTypes.bool,
	blurOnEnter : PropTypes.bool,
	blurOnESC   : PropTypes.bool,
	color       : PropTypes.string,
}

export default DelayedInput
