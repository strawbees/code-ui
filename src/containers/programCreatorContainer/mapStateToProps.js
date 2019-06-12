import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import factoryCodeSelector from 'src/selectors/factoryCodeSelector'

export default () => createStructuredSelector({
	flowUrl     : makeStringSelector('routes.flow'),
	blockUrl    : makeStringSelector('routes.block'),
	textUrl     : makeStringSelector('routes.text'),
	factoryCode : factoryCodeSelector(),
})
