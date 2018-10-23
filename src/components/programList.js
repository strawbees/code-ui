import PropTypes from 'prop-types'
import S from 'src/containers/sManager'
import SvgIcon from 'src/components/svgIcon'
import syncIcon from 'src/assets/icons/general/sync.svg'
import {
	WHITE
} from 'src/constants/colors'
import {
	NEEDS_SYNC,
	SYNCING,
	READY,
	ERROR
} from 'src/constants/storage'

const StorageProgramList = ({
	ids,
	ItemContainer,
	title,
	storageStatus
}) => (
	<div className='root programList'>
		<style jsx>{`
				.root {
					padding: 0.5rem;
					display: flex;
					flex-direction: column;
				}
				.root :global(.programListItem) {
					margin: 0.5rem 0;
				}
				.title {
					text-align: center;
				}
				.root :global(.sync-icon) {
					align-self: center;
					height: 3rem;
					width: 3rem;
					fill: ${WHITE};
					animation: spin-animation 2s linear infinite reverse;
				}
				@keyframes spin-animation {
					from {
						transform: rotateZ(0);
					}
					to {
						transform: rotateZ(360deg);
					}
				}
				.controls {
					display: grid;
					grid-template-columns: 4rem auto 10rem;
					padding: 0 3rem 0 0.5rem;
				}
				.controls > *{
					display: flex;
					flex-direction: row;
					align-items: flex-start;
				}
				.controls .pill {
					font-size: 0.8rem;
					font-weight: bold;
					background-color: ${WHITE};
					border-radius: 1rem;
					padding: 0 0.5rem;
					opacity: 0.5;
				}
				.controls .updated {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
				}
				.empty {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-radius: 1rem;
					background-color: rgba(255,255,255,0.2);
					min-height: 3rem;
				}
				@media (max-width: 400px) {
					.controls {
						grid-template-columns: 2.75rem auto 10rem;
					}
				}
				@media (max-width: 350px) {
					.controls {
						display: none;
					}
				}
			`}</style>
		{title &&
				<div className='title global-type global-type-h3'>
					{title}
				</div>
		}
		{(storageStatus === SYNCING || storageStatus === NEEDS_SYNC) &&
				<SvgIcon
					className='sync-icon'
					icon={syncIcon}
				/>
		}
		{ids && ids.length > 0 &&
				<div className='controls'>
					<div className='type'>
						<div className='pill'>
							<S value='ui.program_list.controls.type'/>
						</div>
					</div>
					<div className='name'>
						<div className='pill'>
							<S value='ui.program_list.controls.name'/>
						</div>
					</div>
					<div className='updated'>
						<div className='pill'>
							<S value='ui.program_list.controls.updated'/>
						</div>
					</div>
				</div>
		}
		{ids &&
				<div className='list'>
					{ids.map(id =>
						<ItemContainer key={id} id={id}/>
					)}
				</div>
		}
		{(!ids || !ids.length) &&
				<div className='empty'>
					<S value='ui.program_list.empty'/>
				</div>
		}
	</div>
)

StorageProgramList.defaultProps = {
	ids : []
}

StorageProgramList.propTypes = {
	ItemContainer : PropTypes.func,
	ids           : PropTypes.arrayOf(PropTypes.string),
	title         : PropTypes.string,
	storageStatus : PropTypes.oneOf([
		NEEDS_SYNC,
		SYNCING,
		READY,
		ERROR
	])
}

export default StorageProgramList
