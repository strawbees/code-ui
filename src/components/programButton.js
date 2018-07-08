import React from 'react'
import PropTypes from 'prop-types'
import Link from 'src/components/link'
import ProgramTitle from 'src/components/programTitle'

const ProgramButton = ({
	name,
	url,
	type,
	updatedAt,
	onClick,
}) =>
	<div className='root programButton'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.root :global(>.link) {
				flex: 1;
				display: flex;
				flex-direction: column;
			}
			.root :global(>.link:focus) {
				outline: none;
			}
			.root :global(>.link) {
				text-decoration: none;
			}
		`}</style>
		<Link to={url} onClick={onClick}>
			<ProgramTitle
				name={name}
				type={type}
				updatedAt={updatedAt}
			/>
		</Link>
	</div>

ProgramButton.propTypes = {
	name      : PropTypes.string,
	url       : PropTypes.string,
	type      : PropTypes.string,
	updatedAt : PropTypes.string,
	onClick   : PropTypes.func,
}

export default ProgramButton
