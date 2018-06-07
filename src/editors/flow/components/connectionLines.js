import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { GRAY } from 'src/constants/colors'

class ConnectionLines extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
	}
	render() {

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
				<g>
					<line x1={100} x2={500} y1={100} y2={600}/>
				</g>
			</svg>
		)
	}
}

ConnectionLines.propTypes = {
}

export default ConnectionLines
