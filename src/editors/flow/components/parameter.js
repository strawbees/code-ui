import PropTypes from 'prop-types'
import ParameterHandleContainer from 'src/editors/flow/containers/parameterHandleContainer'
import AddItemButton from 'src/editors/flow/components/addItemButton'

const Parameter = ({
	id,
	instanceId,
	name,
	isMultiple,
	addItem,
}) =>
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
				<AddItemButton onClick={addItem}/>
			}
		</div>
		{!isMultiple &&
			<ParameterHandleContainer
				id={id}
				instanceId={instanceId}
			/>
		}
	</div>

Parameter.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
	name       : PropTypes.string,
	isMultiple : PropTypes.bool,
	addItem    : PropTypes.func,
}

export default Parameter
