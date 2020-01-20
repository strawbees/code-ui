import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	titleFlow  : makeStringSelector('coding_cards.flow.title'),
	titleBlock : makeStringSelector('coding_cards.block.title'),
})
