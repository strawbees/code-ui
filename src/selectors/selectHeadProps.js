/* global CANONICAL_URL */
import selectOgProps from 'src/selectors/selectOgProps'
import s from 'src/selectors/selectString'

const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

export default (state) => ({
	head : {
		...selectOgProps({
			url         : `${baseUrl}${s(`${state.query.ref}.url`, state)}`,
			title       : s(`${state.query.ref}.og.title`, state),
			description : s(`${state.query.ref}.og.description`, state),
			image       : s(`${state.query.ref}.og.image`, state)
		}, state)
	}
})
