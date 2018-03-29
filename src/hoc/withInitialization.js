import React from 'react'
import withSetup from 'src/hoc/withSetup'
import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'
import parseUrlVars from 'src/utils/parseUrlVars'
import loadStaticData from 'src/utils/loadStaticData'
import storage from 'src/utils/storage'
import * as setupActions from 'src/actions/setup'

let firstRunOnClient = true

export default (Component) => {
	class ComponentWithInitialization extends React.Component {
		static async setup({
			// next props
			store,
			query,
			asPath,
			isServer,
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
				setStrings({
					locale : query.locale,
					data   : await loadStaticData(`locales/${query.locale}/computed.json`)
				})
			}
			/* if (!isServer) {
				const computedAsPath = url && asPath !== url.asPath ?
					url.asPath : asPath
				setAsPath(computedAsPath)
				setUrlVars(parseUrlVars(computedAsPath))
				setLocalStorage(storage.get())
			} */
		}
		async componentDidMount() {
			const {
				setLocalStorage
			} = this.props
			if (firstRunOnClient) {
				firstRunOnClient = false
				setLocalStorage(storage.get())
			}
		}
		render() {
			return <Component />
		}
	}

	const mapStateToProps = ({
		routes,
		locales,
		strings
	}) => ({
		routes,
		locales,
		strings
	})
	const mapDispatchToProps = autobindDispatchToProps(setupActions)

	return withSetup(
		ComponentWithInitialization,
		mapStateToProps,
		mapDispatchToProps
	)
}
