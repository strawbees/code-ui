import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import NodeTypeName from 'src/editors/flow/components/nodeTypeName'

const NodeMini = ({
	icon,
	name,
	color
}) =>
	<div className='root nodeMini'>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				padding: 0.3rem;
				border-radius: 2rem;
				z-index: 10;
			}
			.root:hover {
				background-color: ${tinycolor(color).setAlpha(0.75).toRgbString()};
			}
			@media (max-width: 600px) {
				.root :global(>.nodeTypeName) {
					padding-right: 0.4rem;
				}
				.root :global(>.nodeTypeName .name) {
					display: none;
				}
				.root :global(>.nodeTypeName .svgIcon) {
					margin-right: -0.4rem;
				}
			}
		`}</style>
		<NodeTypeName icon={icon} name={name}/>
	</div>

NodeMini.propTypes = {
	icon  : PropTypes.func,
	name  : PropTypes.string,
	color : PropTypes.string,
}

export default NodeMini
