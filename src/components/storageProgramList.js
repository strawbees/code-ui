import PropTypes from 'prop-types'
import StorageProgramListItemContainer from 'src/containers/storageProgramListItemContainer'

const StorageProgramList = ({
	ids
}) =>
	<div className='root storageProgramList'>
		{ids && ids.map(id =>
			<StorageProgramListItemContainer key={id} id={id}/>
		)}
	</div>

StorageProgramList.defaultProps = {
	ids : []
}

StorageProgramList.propTypes = {
	ids : PropTypes.arrayOf(PropTypes.string)
}

export default StorageProgramList
