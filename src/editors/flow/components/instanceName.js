import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'src/utils/debounce'

let ID_FACTORY = 0
class InstanceName extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			computedName : props.name
		}
		this.debounceId = `InstanceName${++ID_FACTORY}`
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.name !== this.props.name &&
			prevState.name === this.state.name) {
			this.setState({
				computedName : this.props.name
			})
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
			() => onNameInputChange(name),
			1000
		)
	}

	render() {
		const {
			computedName
		} = this.state
		return (
			<div className='root instanceName'>
				<style jsx>{`
					.root {
					}
				`}</style>
				<input
					className='instanceIdInput'
					type='text'
					value={computedName}
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
