import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { fireGlobalEvent } from 'src/utils/globalEvents'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'

const Link = ({ children, ...props }) => {
	const {
		to,
		external,
		onClick,
		...otherProps
	} = props

	const {
		href,
		as
	} = resolveLinkUrl(to)

	if (to) {
		return (
			<NextLink
				href={href}
				as={as}
				{...otherProps}>

				<a
					className='root link'
					target={external && '_blank'}
					onClick={(nativeEvent) => {
						const evt = { href, as, nativeEvent }
						evt.inApp = as === to
						if (onClick) {
							onClick(nativeEvent)
						}
						fireGlobalEvent('link', evt)
					}}>
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
		<span
			className='root link'
			onClick={(nativeEvent) => {
				const evt = { href, as, nativeEvent }
				if (onClick) {
					onClick(nativeEvent)
				}
				fireGlobalEvent('link', evt)
			}}
			{...otherProps}>
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
