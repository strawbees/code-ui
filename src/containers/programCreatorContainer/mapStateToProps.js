import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import factoryCodeSelector from 'src/selectors/factoryCodeSelector'

const mapStateToProps = () => createStructuredSelector({
	flowUrl     : makeStringSelector('routes.flow'),
	blockUrl    : makeStringSelector('routes.block'),
	textUrl     : makeStringSelector('routes.text'),
	factoryCode : factoryCodeSelector(),
})

export default mapStateToProps
