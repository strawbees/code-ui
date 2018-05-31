import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import debounce from 'src/utils/debounce'
import ParameterHandleContainer from 'src/editors/flow/containers/parameterHandleContainer'
import AddItemButton from 'src/editors/flow/components/addItemButton'
import {
	GRAY,
	YELLOW
} from 'src/constants/colors'

class Parameter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		const {
			id,
			instanceId,
			name,
			isMultiple,
		} = this.props
		return (
			<div className='root parameter'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
					}
					.nameContainer {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-left: 0.5rem;
					}
					.name {
						color: white;
						font-size: 0.7rem;
						-webkit-font-smoothing: subpixel-antialiased;
					}
					.root :global(.addItemButton) {
						margin-left: 0.25rem;
					}
				`}</style>
				<div className='nameContainer'>
					<div className='name'>
						{name}
					</div>
					{isMultiple &&
						<AddItemButton />
					}
				</div>
				{!isMultiple &&
					<ParameterHandleContainer
						id={id}
						instanceId={instanceId}
					/>
				}
			</div>
		)
	}
}

Parameter.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
	name       : PropTypes.string,
	isMultiple : PropTypes.bool,
}

export default Parameter
