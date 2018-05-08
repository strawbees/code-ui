import React from 'react'
import PropTypes from 'prop-types'
import NodeMinimizedContainer from 'src/editors/flow/containers/nodeMinimizedContainer'
import tinycolor from 'tinycolor2'
import { GRAY } from 'src/constants/colors'

const CategoryMenu = ({
	name,
	color,
	toggle,
	folded,
	nodeIds,
}) =>
	<div className='root categoryMenu'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				padding: 0.05rem 0.2rem;
			}
			.button {
				font-size: 0.7rem;
				text-transform: uppercase;
				color: white;
				background-color: ${color};
				width: 100%;
				height: 1.5rem;
				border-radius: 1.5rem;
				padding: 0 0.75rem;
			}
		`}</style>
		<button onClick={toggle} className='button'>
			{name}
		</button>
		<div className='nodes'>
			{nodeIds && nodeIds.map(id =>
				<NodeMinimizedContainer key={id} id={id} />
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
