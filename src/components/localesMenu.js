import PropTypes from 'prop-types'
import Link from 'src/components/link'

const LocalesMenu = ({
	current,
	alternatives
}) =>
	<div className='root localesMenu'>

		{current &&
			<Link>
				{current.name}
			</Link>
		}
		{alternatives.map(({ name, url }, key) =>
			<Link
				key={key}
				to={url}>
				{name}
			</Link>
		)}
	</div>

LocalesMenu.defaultProps = {
	current      : null,
	alternatives : []
}

LocalesMenu.propTypes = {
	current : PropTypes.shape({
		name : PropTypes.string
	}),
	alternatives : PropTypes.arrayOf(PropTypes.shape({
		name : PropTypes.string,
		url  : PropTypes.string
	}))
}

export default LocalesMenu
