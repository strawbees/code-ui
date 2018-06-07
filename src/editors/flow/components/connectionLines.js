import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ConnectionLineContainer from 'src/editors/flow/containers/connectionLineContainer'
import { GRAY } from 'src/constants/colors'

class ConnectionLines extends React.Component {
	render() {
		const { connectionLineIds } = this.props
		return (
			<svg className='root connectionLines'>
				<style jsx>{`
					.root {
						stroke: ${tinycolor(GRAY).darken(20).toRgbString()};
						fill: ${tinycolor(GRAY).darken(20).toRgbString()};
						stroke-linecap: round;
						stroke-linejoin: round;
						stroke-width:2;
						stroke-dasharray: 8 5;
					}
					.arrow {
						fill: none;
						stroke-dasharray: none;
					}
				`}</style>
				<defs>
					<marker
						id="arrow"
						markerWidth="100"
						markerHeight="100"
						refX="5"
						refY="7"
						orient="auto"
						markerUnits="userSpaceOnUse">
						<path className='arrow' d="M5,2 L10,7 L5,12" />
						<path className='arrow' d="M2,7 L10,7" />
					</marker>
				</defs>
				{connectionLineIds && connectionLineIds.map(id =>
					<ConnectionLineContainer key={id} id={id}/>
				)}
			</svg>
		)
	}
}

ConnectionLines.propTypes = {
	connectionLineIds : PropTypes.array,
}

export default ConnectionLines
