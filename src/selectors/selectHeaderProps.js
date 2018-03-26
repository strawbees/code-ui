import selectLocalesMenuProps from 'src/selectors/selectLocalesMenuProps'
import s from 'src/selectors/selectString'

export default (state) => ({
	header : {
		homeUrl    : s('home.url', state),
		flowUrl    : s('flow.url', state),
		scratchUrl : s('scratch.url', state),
		textUrl    : s('text.url', state),
		...selectLocalesMenuProps(state)
	}
})
