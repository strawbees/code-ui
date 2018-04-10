import PropTypes from 'prop-types'
import NextLink from 'next/link'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import generateClassnames from 'src/utils/generateClassnames'

const Link = ({ children, ...props }) => {
	const {
		to,
		external,
		...otherProps
	} = props

	const {
		href,
		as
	} = resolveLinkUrl(to)

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
