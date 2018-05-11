import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import NodeTypeName from 'src/editors/flow/components/nodeTypeName'

const cancelEvent = (e) => {
	e.stopPropagation()
	e.preventDefault()
	console.log(e,'aaa')
	return false
}
const Instance = ({
	id,
	icon,
	name,
	color,
	onIdInputChange
}) =>
	<div className='root instance'>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.25rem;
				border-radius: 2rem;
				min-width: 10rem;
			}
			/* apply syle focus, if moved by draggble container */
			:global(.instanceDraggableContainer:focus) .root {
				background-color: ${tinycolor(color).setAlpha(0.75).toRgbString()};
			}
		`}</style>
		<NodeTypeName icon={icon} name={name}/>
		<input
			className='instanceIdInput'
			type='text'
			value={id}
			onKeyUp={cancelEvent}
			onChange={e => onIdInputChange(e.target.value)}
		/>
	</div>

Instance.propTypes = {
	icon            : PropTypes.func,
	name            : PropTypes.string,
	color           : PropTypes.string,
	onIdInputChange : PropTypes.func,
}

export default Instance
