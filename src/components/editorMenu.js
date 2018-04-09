import React from 'react'
import PropTypes from 'prop-types'

class EditorMenu extends React.Component {
	state = {
		name : ''
	}
	static getDerivedStateFromProps({ name }) {
		return {
			name
		}
	}
	render() {
		const {
			saved,
			saveButtonLabel,
			shareButtonLabel,
			uploadButtonLabel,
			setName,
			setSaved,
			onSharePress,
			onUploadPress,
		} = this.props
		const {
			name
		} = this.state
		return (
			<div className='root editorMenu'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: row;
					}
				`}</style>
				<input
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				{!saved &&
					<button onClick={() => setSaved(true)}>
						{saveButtonLabel}
					</button>
				}
				<button onClick={onSharePress}>
					{shareButtonLabel}
				</button>
				<button onClick={onUploadPress}>
					{uploadButtonLabel}
				</button>
			</div>
		)
	}
}

EditorMenu.defaultProps = {
	name : ''
}

EditorMenu.propTypes = {
	name              : PropTypes.string,
	saved             : PropTypes.bool,
	saveButtonLabel   : PropTypes.string,
	shareButtonLabel  : PropTypes.string,
	uploadButtonLabel : PropTypes.string,
	setName           : PropTypes.func,
	setSaved          : PropTypes.func,
	onSharePress      : PropTypes.func,
	onUploadPress     : PropTypes.func,
}

export default EditorMenu
