import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import NodeTypeName from 'src/editors/flow/components/nodeTypeName'

const Instance = ({
	icon,
	name,
	color
}) =>
	<div className='root instance'>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.25rem;
				border-radius: 2rem;
				min-width: 10rem;
			}
		`}</style>
		<NodeTypeName icon={icon} name={name}/>
	</div>

Instance.propTypes = {
	icon  : PropTypes.func,
	name  : PropTypes.string,
	color : PropTypes.string,
}

export default Instance
