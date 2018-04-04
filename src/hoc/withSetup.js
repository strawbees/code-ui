import React from 'react'
import { connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import initStore from 'src/store'

const fn = () => ({})

export default (
	Component,
	mapStateToProps = fn,
	mapDispatchToProps = fn
) => {
	const ConectedComponent = connect(
		mapStateToProps,
		mapDispatchToProps
	)(Component)
	class ComponentWithSetup extends React.Component {
		static async getInitialProps(ctx) {
			await Component.setup({
				...ctx,
				...mapStateToProps(ctx.store.getState(), {}),
				...mapDispatchToProps(ctx.store.dispatch)
			})
		}
		render() {
			return <ConectedComponent />
		}
	}
	return withRedux(
		initStore
	)(ComponentWithSetup)
}
