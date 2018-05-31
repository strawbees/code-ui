import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import debounce from 'src/utils/debounce'
import { WHITE } from 'src/constants/colors'

const cancelEvent = e => {
	e.preventDefault()
	e.stopPropagation()
}
let ID_FACTORY = 0
class InstanceName extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			computedName : props.name
		}
		this.debounceId = `InstanceName${++ID_FACTORY}`
		this.input = React.createRef()
	}
	getSnapshotBeforeUpdate() {
		return {
			caret : this.input &&
				this.input.current &&
				this.input.current.selectionStart
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { name : prevName } = prevProps
		const { name } = this.props
		const { computedName : prevComputedName } = prevState
		const { computedName } = this.state

		if ((name !== computedName) &&
			(prevName !== name) &&
			(prevComputedName === computedName)) {
			this.setState({
				computedName : name
			})
		}
		if (snapshot.caret && this.input && this.input.current) {
			this.input.current.setSelectionRange(snapshot.caret, snapshot.caret)
		}
	}

	localUpdateName = (e) => {
		const name = e.target.value
		this.setState({
			computedName : e.target.value
		})
		const {
			onNameInputChange
		} = this.props
		debounce(
			this.debounceId,
			() => {
				if (!name) {
					this.setState({
						computedName : this.props.name
					})
				}
				onNameInputChange(name)
			},
			1000
		)
	}

	render() {
		const {
			computedName
		} = this.state
		const size = computedName ? computedName.length * 1.1 : 1
		return (
			<div className='root instanceName'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: row;
						align-items: center;
					}
					input {
						appearance: none;
						border: 0;
						padding: 0;
						display: block;
						vertical-align: middle;
						white-space: normal;
						min-width: 0;
						background: none;
						background-color: ${tinycolor(WHITE).setAlpha(0.5).toRgbString()};
						line-height: 1;
						font-family: 'Code', monospace;
						font-size: 0.7rem;
						text-align: center;
						padding: 0.1rem 0.2rem;
						outline: none;
					}
					input:focus {
						background-color: ${tinycolor(WHITE).toRgbString()};
					}
				`}</style>
				<input
					type='text'
					ref={this.input}
					value={computedName}
					size={size}
					spellCheck='false'
					autoCorrect='off'
					onKeyUp={cancelEvent}
					onChange={this.localUpdateName}
				/>
			</div>
		)
	}
}

InstanceName.propTypes = {
	name              : PropTypes.string,
	onNameInputChange : PropTypes.func,
}

export default InstanceName
