import PropTypes from 'prop-types'
import Button from 'src/components/button'
import SvgIcon from 'src/components/svgIcon'
import editorIcons from 'src/assets/icons/editors/small'

const ProgramTitleListItem = ({
	name,
	type,
	updatedAt,
	displayAsButton,
}) => {
	const Container = displayAsButton ? Button : 'div'
	return (
		<div className='root programTitleListItem'>
			<style jsx>{`
				.root {
					display: flex;
					flex-direction: column;
					align-items: stretch;
				}
				.root :global(>.container) {
					position: relative;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				.root :global(>.container:focus) {
					outline: none;
				}
				.root :global(>.container .svgIcon) {
					flex-shrink: 0;
					width: 3.5rem;
					height: 2.25rem;
					margin-right: 0.5rem;
				}
				.root :global(>.container .name) {
					flex-shrink: 1;
					flex-grow: 1;
					width: 0;
					flex-basis: 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.root :global(>.container .date) {
					flex-shrink: 0;
					font-size: 0.8rem;
					margin-left: 0.5rem;
					text-align: right;
				}
				@media (max-width: 400px) {
					.root :global(>.container .svgIcon) {
						width: 2rem;
						height: 2.25rem;
					}
					.root :global(>.container .date) {
						font-size: 0.6rem;
					}
				}
			`}</style>
			<Container
				className='container'
				tabIndex='-1'>
				<SvgIcon
					icon={editorIcons[type]}
				/>
				<div className='name'>{name}</div>
				{updatedAt &&
					<div className='date'>{updatedAt}</div>
				}
			</Container>
		</div>
	)
}


ProgramTitleListItem.defaultProps = {
	displayAsButton : true
}

ProgramTitleListItem.propTypes = {
	name      : PropTypes.string,
	type      : PropTypes.string,
	updatedAt : PropTypes.string,

	displayAsButton : PropTypes.bool,
}

export default ProgramTitleListItem
