import selectHeadProps from 'src/selectors/selectHeadProps'
import selectHeaderProps from 'src/selectors/selectHeaderProps'
// import selectFooterProps from 'src/selectors/selectFooterProps'

export default (state) => ({
	app : {
		...selectHeadProps(state),
		...selectHeaderProps(state),
		// ...selectFooterProps(state)
	}
})
