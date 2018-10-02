import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import NodeTypeName from 'src/editors/flow/components/nodeTypeName'
import InstanceNameContainer from 'src/editors/flow/containers/instanceNameContainer'
import ParameterListContainer from 'src/editors/flow/containers/parameterListContainer'
import OutletListContainer from 'src/editors/flow/containers/outletListContainer'

const Instance = ({
	id,
	icon,
	nodeName,
	color,
}) =>
	<div className='root instance'
		/* id needed for correctly resizing the workspace */
		id={`instance${id}`}>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.5rem 0 1rem 0;
				border-radius: 1rem;
				min-width: 10.5rem;
				/*animation-duration: 0.1s;
				animation-name: pop;
				animation-timing-function: ease-out;
				transform-origin: top center;*/
			}
			@keyframes pop {
				from { transform: scale3d(0,0,0); }
				to { transform: scale3d(1,1,1); }
			}
			/* apply syle focus, if moved by draggble container */
			:global(.instanceDraggableContainer:focus) .root,
			:global(.instanceDraggableContainer:focus-within) .root,
			.root:focus-within {
				background-color: ${tinycolor(color).setAlpha(0.75).toRgbString()};
			}
			.root :global(.instanceName) {
				margin-top: 0.25rem;
			}
			.connections {
				display: flex;
				flex-direction: row;
				width: 100%;
				padding-top: 0.25rem;
			}
			.connections .parameters,
			.connections .outlets {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
			}
			.connections .outlets {
				align-items: flex-end;
				margin-left: 0.2rem;
			}
			.connections .parameters :global(>*),
			.connections .outlets :global(>*) {
				margin: 0.1rem 0;
			}
		`}</style>
		<NodeTypeName icon={icon} name={nodeName}/>
		<InstanceNameContainer id={id}/>
		<div className='connections'>
			<div className='parameters'>
				<ParameterListContainer
					id={id}
				/>
			</div>
			<div className='outlets'>
				<OutletListContainer
					id={id}
				/>
			</div>
		</div>
	</div>

Instance.propTypes = {
	id       : PropTypes.string,
	icon     : PropTypes.func,
	nodeName : PropTypes.string,
	color    : PropTypes.string,
}

export default Instance
