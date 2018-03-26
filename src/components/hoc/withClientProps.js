import { Component } from 'react'
import { registerStrings } from 'src/utils/s'
import loadStaticData from 'src/utils/loadStaticData'
import inMemoryCache from 'src/utils/inMemoryCache'

let firstClientRender = process.browser

export default Child => class WithClientProps extends Component {
	static async getInitialProps(ctx) {
		const { query, asPath } = ctx
		let props = {
			query,
			asPath,
			locales :
				inMemoryCache.get('locales') ||
				await loadStaticData('locales/locales.json'),
			routes :
				inMemoryCache.get('routes') ||
				await loadStaticData('routes.json'),
			strings :
				inMemoryCache.get(`strings${query.locale}`) ||
				await loadStaticData(`locales/${query.locale}/strings.json`)
		}
		// Register strings (for localization)
		registerStrings(props.strings)

		if (Child.getInitialProps) {
			props = await Child.getInitialProps(props)
		}
		if (process.browser) {
			props = WithClientProps.getClientProps(props)
		}
		return props
	}

	static async getClientProps(props) {
		// Register strings (for localization)
		registerStrings(props.strings)

		props = {
			...props,
			storage : localStorage.getItem('storage') || {}
		}
		return Child.getClientProps(props)
	}

	constructor(props) {
		super(props)

		// cache the loaded props
		const {
			query : { locale },
			locales,
			routes,
			strings
		} = this.props

		inMemoryCache.set('locales', locales)
		inMemoryCache.set('routes', routes)
		inMemoryCache.set(`strings${locale}`, strings)
	}

	async componentDidMount() {
		// If this is the first client render, get the "client side"
		// props and merge it to state.
		if (firstClientRender) {
			this.setState({
				...await WithClientProps.getClientProps(this.props)
			})
		}
	}

	render() {
		const { props, state } = this
		let computedProps = props
		if (firstClientRender && state) {
			computedProps = state
			firstClientRender = false
		}
		return <Child {...computedProps}/>
	}
}
