import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ConnectionLineContainer from 'src/editors/flow/containers/connectionLineContainer'
import { GRAY } from 'src/constants/colors'

class ConnectionLines extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
	}
	render() {
		const { connectionLineIds } = this.props
		return (
			<svg className='root connectionLines'>
				<style jsx>{`
					.root {
						stroke: ${tinycolor(GRAY).toRgbString()};
						stroke-linecap:round;
						stroke-width:3;
						stroke-dasharray: 8 6;
					}
				`}</style>
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
