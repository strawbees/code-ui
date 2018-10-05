import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ProgramTitle from 'src/components/programTitle'
import { GRAY } from 'src/constants/colors'

const ProgramMenuFrame = ({
	name,
	type,
	updatedAt,
	centered,
	children,
}) =>
	<div className='root programMenuFrame'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: stretch;
			}
			.container {
				margin-top: 0.5rem;
				display: flex;
				flex-direction: column;
				align-items: ${centered ? 'stretch' : 'flex-start'};
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
				padding: 0.5rem;
				border-radius: 0.5rem;
			}
			.container :global(>*){
				margin-bottom: 0.5rem;
			}
			.container :global(>*:last-child) {
				margin-bottom: 0;
			}
		`}</style>
		<ProgramTitle
			name={name}
			type={type}
			updatedAt={updatedAt}
			displayAsButton={false}
		/>
		<div className='container'>
			{children}
		</div>
	</div>

ProgramMenuFrame.propTypes = {
	name      : PropTypes.string,
	type      : PropTypes.string,
	updatedAt : PropTypes.string,
	centered  : PropTypes.bool,
}

export default ProgramMenuFrame
