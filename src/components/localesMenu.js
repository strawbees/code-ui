import PropTypes from 'prop-types'
import Link from 'src/components/link'

const LocalesMenu = ({
	current,
	alternatives
}) =>
	<div className='root localesMenu'>

		{current &&
			<Link>
				{current.title}
			</Link>
		}
		{alternatives.map(({ title, url }, key) =>
			<Link
				key={key}
				to={url}>
				{title}
			</Link>
		)}
	</div>

LocalesMenu.defaultProps = {
	current      : null,
	alternatives : []
}

LocalesMenu.propTypes = {
	current : PropTypes.shape({
		title : PropTypes.string,
		url   : PropTypes.string
	}),
	alternatives : PropTypes.arrayOf(PropTypes.shape({
		title : PropTypes.string,
		url   : PropTypes.string
	}))
}

export default LocalesMenu
