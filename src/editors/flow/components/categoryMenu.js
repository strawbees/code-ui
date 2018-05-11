import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import generalIcons from 'src/editors/flow/assets/icons/general'
import NodeMiniDraggableContainer from 'src/editors/flow/containers/nodeMiniDraggableContainer'


const CategoryMenu = ({
	name,
	color,
	toggle,
	folded,
	nodeIds,
}) =>
	<div className={`root categoryMenu ${folded ? 'folded' : 'not-folded'}`}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: strech;
				width: 100%;
			}
			.button {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				font-size: 0.7rem;
				letter-spacing: 0.05rem;
				text-transform: uppercase;
				color: white;
				fill: white;
				background-color: ${color};
				width: 100%;
				height: 2rem;
				border-radius: 2rem;
				padding: 0 1rem;
			}
			.button :global(.svgIcon) {
				height: 1.5rem;
				width:  1.5rem;
			}
			.nodes {
				margin-top: 0.4rem;
				padding: 0 1rem 0 0;
			}
			.folded .nodes {
				overflow-y: hidden;
				height: 0;
			}
			.nodes :global(> *) {
				margin-bottom: 0.4rem;
			}.nodes :global(>*:last-child) {
				margin-bottom: 0;
			}
		`}</style>
		<button onClick={toggle} className='button'>
			{name}
			<SvgIcon icon={folded ? generalIcons.expand : generalIcons.collapse}/>
		</button>
		<div className='nodes'>
			{nodeIds && nodeIds.map(id =>
				<NodeMiniDraggableContainer key={id} id={id} />
			)}
		</div>
	</div>


CategoryMenu.propTypes = {
	name    : PropTypes.string,
	color   : PropTypes.string,
	nodeIds : PropTypes.arrayOf(PropTypes.string),
	toggle  : PropTypes.func,
	folded  : PropTypes.bool,
}

export default CategoryMenu
