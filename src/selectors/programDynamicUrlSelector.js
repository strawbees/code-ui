import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import propsSelector from 'src/selectors/propsSelector'
import { resolveBackendFromProgramId } from 'src/storage'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL
	}
} = getConfig()
const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

export default () => createSelector(
	[
		stateSelector(),
		propsSelector(),
	],
	(
		state,
		{
			id,
			type,
		},
	) => {
		const storageBackend = resolveBackendFromProgramId(id)
		if (storageBackend && storageBackend.name !== 'local') {
			return `${baseUrl}${makeStringSelector(`routes.${type}`)(state)}?p=${id}`
		}
		return ''
	}
)
