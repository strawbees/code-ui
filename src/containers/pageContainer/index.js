import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Spinner from 'src/components/spinner'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageHomeContainer = dynamic(
	import('src/containers/pageHomeContainer'),
	{ loading : () => <Spinner/> }
)
const PageFlowContainer = dynamic(
	import('src/containers/pageFlowContainer'),
	{ loading : () => <Spinner/> }
)
const PageBlockContainer = dynamic(
	import('src/containers/pageBlockContainer'),
	{ loading : () => <Spinner/> }
)
const PageTextContainer = dynamic(
	import('src/containers/pageTextContainer'),
	{ loading : () => <Spinner/> }
)
// import PageHomeContainer from 'src/containers/pageHomeContainer'
// import PageFlowContainer from 'src/containers/pageFlowContainer'
// import PageBlockContainer from 'src/containers/pageBlockContainer'
// import PageTextContainer from 'src/containers/pageTextContainer'

const PageContainer = (props) => {
	const components = {
		home  : PageHomeContainer,
		flow  : PageFlowContainer,
		block : PageBlockContainer,
		text  : PageTextContainer,
	}
	const RefComponent = components[props.queryRef]
	return (
		<div className='root page'>
			<RefComponent {...props}/>
		</div>
	)
}

PageContainer.propTypes = {
	queryRef : PropTypes.oneOf([
		'home',
		'flow',
		'block',
		'text'
	])
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageContainer)
