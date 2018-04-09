import React from 'react'
import { connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import initStore from 'src/store'

export default (
	Component,
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
) => {
	const ConectedComponent = connect(
		mapStateToProps,
		mapDispatchToProps,
		mergeProps
	)(Component)
	class ComponentWithSetup extends React.Component {
		static async getInitialProps(ctx) {
			if (!mapStateToProps) {
				mapStateToProps = () => ({})
			}
			if (!mapDispatchToProps) {
				mapDispatchToProps = () => ({})
			}
			if (!mergeProps) {
				mergeProps = (stateProps = {}, dispatchProps = {}, ownProps = {}) =>
					Object.assign({}, ownProps, stateProps, dispatchProps)
			}

			await Component.setup({
				...ctx,
				...mergeProps(
					mapStateToProps(ctx.store.getState(), {}),
					mapDispatchToProps(ctx.store.dispatch)
				)
			})
		}
		render() {
			return <ConectedComponent {...this.props}/>
		}
	}
	return withRedux(
		initStore
	)(ComponentWithSetup)
}
