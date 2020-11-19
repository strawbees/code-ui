import { createStructuredSelector } from 'reselect'
import internalDataNodeIdsStringSelector from '../../selectors/internalDataNodeIdsStringSelector'
import internalDataNodeTypesStringSelector from '../../selectors/internalDataNodeTypesStringSelector'

const mapStateToProps = () => createStructuredSelector({
	internalDataNodeIdsString   : internalDataNodeIdsStringSelector(),
	internalDataNodeTypesString : internalDataNodeTypesStringSelector(),
})

export default mapStateToProps
