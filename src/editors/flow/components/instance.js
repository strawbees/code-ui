import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import NodeTypeName from 'src/editors/flow/components/nodeTypeName'
import InstanceNameContainer from 'src/editors/flow/containers/instanceNameContainer'
import ParameterContainer from 'src/editors/flow/containers/parameterContainer'
//import OutletContainer from 'src/editors/flow/containers/outletContainer'

const Instance = ({
	id,
	icon,
	nodeName,
	color,
	parameterIds,
	outletIds,
}) =>
	<div className='root instance'>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.25rem 0 1rem 0;
				border-radius: 1rem;
				min-width: 10rem;
				animation-duration: 0.1s;
				animation-name: pop;
				animation-timing-function: ease-out;
				transform-origin: top center;
			}
			@keyframes pop {
				from { transform: scale3d(0,0,0); }
				to { transform: scale3d(1,1,1); }
			}
			/* apply syle focus, if moved by draggble container */
			:global(.instanceDraggableContainer:focus) .root,
			:global(.instanceDraggableContainer:focus-within) .root {
				background-color: ${tinycolor(color).setAlpha(0.75).toRgbString()};
			}
			.root :global(.instanceName) {
				margin-top: 0.25rem;
			}
			.connections {
				display: flex;
				flex-direction: row;
				width: 100%;
			}
			.connections > * {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-start
			}
		`}</style>
		<NodeTypeName icon={icon} name={nodeName}/>
		<InstanceNameContainer id={id}/>
		<div className='connections'>
			<div className='parameters'>
				{parameterIds.map(parameterId =>
					<ParameterContainer
						key={parameterId}
						id={parameterId}
						instanceId={id}
					/>
				)}
			</div>
			<div className='outlets'>
				{/*outletIds.map(outletId =>
					<OutletContainer
						key={outletId}
						id={outletId}
						instanceId={id}
					/>
				)*/}
			</div>
		</div>
	</div>

Instance.propTypes = {
	id           : PropTypes.string,
	icon         : PropTypes.func,
	nodeName     : PropTypes.string,
	color        : PropTypes.string,
	parameterIds : PropTypes.arrayOf(PropTypes.string),
	outletIds    : PropTypes.arrayOf(PropTypes.string),
}

export default Instance
