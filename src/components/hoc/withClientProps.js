import { Component } from 'react'
import parseUrlVars from 'src/utils/parseUrlVars'
import loadStaticData from 'src/utils/loadStaticData'
import inMemoryCache from 'src/utils/inMemoryCache'

let firstClientRender = process.browser
let FACTORY = 0

export default Child => class WithClientProps extends Component {
	static async getInitialProps(ctx) {
		let props = {
			query   : ctx.query,
			asPath  : process.browser && ctx.asPath,
			locales :
				inMemoryCache.get('locales') ||
				await loadStaticData('locales/locales.json'),
			routes :
				inMemoryCache.get('routes') ||
				await loadStaticData('routes.json'),
			strings :
				inMemoryCache.get(`strings${ctx.query.locale}`) ||
				await loadStaticData(`locales/${ctx.query.locale}/computed.json`)
		}

		if (Child.getInitialProps) {
			props = await Child.getInitialProps(props)
		}
		if (process.browser) {
			props = await WithClientProps.getClientProps(props)
		}
		return props
	}

	static async getClientProps(props) {
		// Due to the static export, we need to recompute the asPath
		// in the client side
		if (!props.asPath && props.url) {
			props = {
				...props,
				asPath : props.url.asPath
			}
		}
		props = {
			...props,
			urlVars : parseUrlVars(props.asPath),
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

		this.state = this.props

		this.label = ++FACTORY
	}

	componentWillReceiveProps(props) {
		this.setState({
			...props
		})
	}

	async componentDidMount() {
		// If this is the first client render, get the "client side"
		// props and merge it to state.
		if (firstClientRender) {
			firstClientRender = false
			this.setState({
				...await WithClientProps.getClientProps(this.state)
			})
		}
	}

	render() {
		const { state } = this
		return <Child {...state}/>
	}
}
