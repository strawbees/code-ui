import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import SvgIcon from 'src/components/svgIcon'
import { WHITE } from 'src/constants/colors'

const NodeTypeName = ({
	icon,
	name,
}) =>
	<div className='root nodeTypeName'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: ${tinycolor(WHITE).toRgbString()};
				border-radius: 2rem;
				padding: 0 0.6rem 0 0.4rem;
				height: 1.25rem;
				position: relative;
			}
			.root :global(.svgIcon) {
				height: 1.7rem;
				width:  1.7rem;
				margin-left: -0.4rem;
				margin-right: 0.25rem;
			}
			.name {
				font-size: 0.8rem;
			}
		`}</style>
		<SvgIcon icon={icon}/>
		<div className="name">
			{name}
		</div>
	</div>

NodeTypeName.propTypes = {
	icon : PropTypes.func,
	name : PropTypes.string,
}

export default NodeTypeName
