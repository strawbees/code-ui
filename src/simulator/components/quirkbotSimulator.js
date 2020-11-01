import PropTypes from 'prop-types'
import NodeIconsListContainer from '../containers/nodeIconsListContainer'
import NodePartsListContainer from '../containers/nodePartsListContainer'
import Figure from './figure'
import QuirkbotSVG from '../assets/images/general/quirkbot.svg'

const QuirkbotSimulator = () =>
	<div className='root quirkbotSimulator'>
		<style jsx>{`
			.root {
				z-index: 100;
				width: 50vw;
				background-color: red;
			}
			.quirkbot {
				position: relative;
				width: 100%;
				height 300px;
				background-color: white;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.origin {
				transform: scale(0.5);
			}

		`}</style>
		<div className='controls'>
			<div>controls</div>
		</div>
		<div className='quirkbot'>
			<div className='origin' id='origin'>
				<Figure svg={QuirkbotSVG} className='board'/>
				<NodePartsListContainer/>
			</div>
		</div>
		<div className='nodes'>
			<div>nodes</div>
			<NodeIconsListContainer/>
		</div>
	</div>

QuirkbotSimulator.defaultProps = {
}

QuirkbotSimulator.propTypes = {
}

export default QuirkbotSimulator
