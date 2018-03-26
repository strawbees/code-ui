import selectLocalesMenuProps from 'src/selectors/selectLocalesMenuProps'
import s from 'src/utils/s'

export default (state) => ({
	header : {
		homeUrl    : s('home.url'),
		flowUrl    : s('flow.url'),
		scratchUrl : s('scratch.url'),
		textUrl    : s('text.url'),
		...selectLocalesMenuProps(state)
	}
})
