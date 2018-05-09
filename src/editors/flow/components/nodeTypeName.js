import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'

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
				background-color: white;
				border-radius: 2rem;
				padding: 0 0.4rem;
				height: 1.25rem;
				position: relative;
			}
			.root :global(.svgIcon) {
				height: 1.5rem;
				width:  1.5rem;
				margin-left: -0.4rem;
				margin-right: 0.2rem;
			}
			.name {
				font-size: 0.7rem;
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
