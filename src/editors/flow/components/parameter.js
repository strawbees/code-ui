import PropTypes from 'prop-types'
import ParameterHandleContainer from 'src/editors/flow/containers/parameterHandleContainer'
import AddItemButton from 'src/editors/flow/components/addItemButton'
import RemoveItemButton from 'src/editors/flow/components/removeItemButton'

const Parameter = ({
	id,
	instanceId,
	name,
	isMultiple,
	numItems,
	addItem,
	removeItem,
}) =>
	<div className='root parameter'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}
			.nameContainer {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 0.5rem;
			}
			.name {
				color: white;
				font-size: 0.75rem;
				-webkit-font-smoothing: subpixel-antialiased;
			}
			.root .nameContainer :global(>.addItemButton) {
				margin-left: 0.25rem;
			}
			.nameContainer {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 0.5rem;
			}
			.item {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 0.2rem;
			}
			.root .item :global(>.removeItemButton) {
				margin-left: 0.25rem;
			}
			.item-index {
				color: white;
				font-size: 0.7rem;
				margin-left: 0.25rem;
				width: 0.6rem;
				text-align: center;
				-webkit-font-smoothing: subpixel-antialiased;
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
		{isMultiple && [...Array(numItems)].map((_, index) =>
			<div className='item' key={index}>
				<ParameterHandleContainer
					id={`${id}.${index}`}
					instanceId={instanceId}
				/>
				<div className='item-index'>{index}</div>
				<RemoveItemButton onClick={() => removeItem(index)}/>
			</div>
		)}
	</div>

Parameter.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
	name       : PropTypes.string,
	isMultiple : PropTypes.bool,
	numItems   : PropTypes.number,
	addItem    : PropTypes.func,
	removeItem : PropTypes.func,
}

export default Parameter
