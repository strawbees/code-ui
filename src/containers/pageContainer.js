import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import queryRefSelector from 'src/selectors/queryRefSelector'
import Spinner from 'src/components/spinner'

const PageHomeContainer = dynamic(
	import('src/containers/pageHomeContainer'),
	{ loading : () => <Spinner/> }
)
const PageFlowContainer = dynamic(
	import('src/containers/pageFlowContainer'),
	{ loading : () => <Spinner/> }
)

const PageContainer = ({ queryRef }) => {
	const components = {
		home : PageHomeContainer,
		flow : PageFlowContainer
	}
	const RefComponent = components[queryRef]
	return <RefComponent />
}

PageContainer.propTypes = {
	queryRef : PropTypes.oneOf([
		'home',
		'flow',
		'scratch',
		'text'
	])
}

const mapStateToProps = (state) => ({
	queryRef : queryRefSelector(state)
})

export default connect(mapStateToProps)(PageContainer)
