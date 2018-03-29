import { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import initStore from 'src/store'
import parseUrlVars from 'src/utils/parseUrlVars'
import loadStaticData from 'src/utils/loadStaticData'
import storage from 'src/utils/storage'
import * as setupActions from 'src/actions/setup'

export default Child => {
	class WithClientProps extends Component {
		static async getInitialProps(ctx) {
			WithClientProps.setup({
				__ctx : ctx,
				...ctx,
				...WithClientProps.mapStateToProps(ctx.store.getState()),
				...WithClientProps.mapDispatchToProps(ctx.store.dispatch)
			})
		}
		static async setup({
			// next props
			store,
			query,
			asPath,
			isServer,
			__ctx, // <- full next ctx to pass down to child
			// state to props
			routes,
			locales,
			strings,
			// dispatch to props
			setQuery,
			setRoutes,
			setLocales,
			setStrings,
			setAsPath,
			setUrlVars,
			setLocalStorage
		}) {
			setQuery(query)
			if (!routes) {
				setRoutes(await loadStaticData('routes.json'))
			}
			if (!locales) {
				setLocales(await loadStaticData('locales/locales.json'))
			}
			if (!strings[query.locale]) {
				setStrings(await loadStaticData(`locales/${query.locale}/computed.json`))
			}
			if (!isServer) {
				const computedAsPath = url && asPath !== url.asPath ?
					url.asPath : asPath
				setAsPath(computedAsPath)
				setUrlVars(parseUrlVars(computedAsPath))
				setLocalStorage(storage.get())
			}

			await Child.setup({
				...__ctx,
				...Child.mapStateToProps(store.getState()),
				...Child.mapDispatchToProps(store.dispatch)
			})
		}

		async componentDidMount() {
			// If this is the first client render, get the "client side"
			// props and merge it to state.
			if (firstClientRender) {
				firstClientRender = false
			//	await WithClientProps.setupClient(this.props)
			}
			//console.log(store.getState())
		}

		render() {
			return <Child />
		}
	}

	WithClientProps.mapStateToProps = ({
		routes,
		locales,
		strings
	}) => ({
		routes,
		locales,
		strings
	})
	WithClientProps.mapDispatchToProps = (dispatch) => ({
		setQuery        : bindActionCreators(setupActions.setQuery, dispatch),
		setAsPath       : bindActionCreators(setupActions.setAsPath, dispatch),
		setLocales      : bindActionCreators(setupActions.setLocales, dispatch),
		setRoutes       : bindActionCreators(setupActions.setRoutes, dispatch),
		setStrings      : bindActionCreators(setupActions.setStrings, dispatch),
		setLocalStorage : bindActionCreators(setupActions.setLocalStorage, dispatch)
	})
	return withRedux(
		initStore,
		WithClientProps.mapStateToProps,
		WithClientProps.mapDispatchToProps
	)(WithClientProps)
}
