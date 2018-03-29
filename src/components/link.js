import PropTypes from 'prop-types'

import NextLink from 'next/link'
import routes from 'static/routes.json'
import generateClassnames from 'src/utils/generateClassnames'

const Link = ({ children, ...props }) => {
	const {
		to,
		external,
		...otherProps
	} = props

	let href
	let as
	if (to && routes[to]) {
		href = {
			pathname : routes[to].page,
			query    : routes[to].query
		}
		as = to
	} else if (to && routes[to.split('?')[0]]) {
		href = {
			pathname : routes[to.split('?')[0]].page,
			query    : routes[to.split('?')[0]].query
		}
		as = to
	} else {
		href = to
	}

	if (to) {
		return (
			<NextLink href={href} as={as} {...otherProps}>
				<a
					className={`root link ${generateClassnames({
						to,
						external
					})}`}
					target={external && '_blank'}>
					<style jsx>{`
						.root {
							display: block;
							cursor: pointer;
						}
					`}</style>
					{children}
				</a>
			</NextLink>
		)
	}

	return (
		<span className={`root link ${generateClassnames({
			to,
			external
		})}`}>
			<style jsx>{`
				.root {
					display: block;
				}
			`}</style>
			{children}
		</span>
	)
}

Link.propTypes = {
	to       : PropTypes.string,
	external : PropTypes.bool
}

export default Link
