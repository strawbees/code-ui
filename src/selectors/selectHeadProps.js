import selectOgProps from 'src/selectors/selectOgProps'
import s from 'src/utils/s'

export default (state) => ({
	head : {
		...selectOgProps({
			title       : s(`${state.query.ref}.og.title`),
			description : s(`${state.query.ref}.og.description`),
			image       : s(`${state.query.ref}.og.image`)
		}, state)
	}
})
