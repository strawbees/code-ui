import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import NodeTypeName from 'src/editors/flow/components/nodeTypeName'
import InstanceNameContainer from 'src/editors/flow/containers/instanceNameContainer'

const Instance = ({
	id,
	icon,
	nodeName,
	color,
}) =>
	<div className='root instance'>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.25rem;
				border-radius: 1rem;
				min-width: 10rem;
			}
			/* apply syle focus, if moved by draggble container */
			:global(.instanceDraggableContainer:focus) .root {
				background-color: ${tinycolor(color).setAlpha(0.75).toRgbString()};
			}
		`}</style>
		<NodeTypeName icon={icon} name={nodeName}/>
		<InstanceNameContainer id={id}/>
	</div>

Instance.propTypes = {
	id       : PropTypes.string,
	icon     : PropTypes.func,
	nodeName : PropTypes.string,
	color    : PropTypes.string
}

export default Instance
