import PropTypes from 'prop-types'
import S from 'src/containers/sManager'
import StorageProgramListItemContainer from 'src/containers/storageProgramListItemContainer'

const StorageProgramList = ({
	ids
}) =>
	<div className='root storageProgramList'>
		<style jsx>{`
			.root {
				background-color: gray;
				padding: 0.5rem;
			}
			.root :global(.programListItem) {
				margin: 0.5rem 0;
			}
			.empty {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 1rem;
				background-color: rgba(255,255,255,0.2);
				height: 5rem;
			}
		`}</style>
		{ids && ids.map(id =>
			<StorageProgramListItemContainer key={id} id={id}/>
		)}
		{(!ids || !ids.length) &&
			<div className='empty'>
				<S value='ui.program_list.empty'/>
			</div>
		}
	</div>

StorageProgramList.defaultProps = {
	ids : []
}

StorageProgramList.propTypes = {
	ids : PropTypes.arrayOf(PropTypes.string)
}

export default StorageProgramList
