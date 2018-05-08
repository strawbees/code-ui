import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'

const NodeMinimized = ({
	icon,
	name,
	color
}) =>
	<div className='root menuItemNode'>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
			}
		`}</style>
		<div className="name">
			{name}
		</div>
	</div>

NodeMinimized.propTypes = {
	name  : PropTypes.string,
	color : PropTypes.string,
}

export default NodeMinimized
