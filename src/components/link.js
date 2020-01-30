import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { fireGlobalEvent } from 'src/utils/globalEvents'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'

const Link = ({ children, ...props }) => {
	const {
		to,
		external,
		onClick,
		className,
		...otherProps
	} = props

	const {
		href,
		as
	} = resolveLinkUrl(to)

	const onClickOrKeyUp = (nativeEvent) => {
		if (nativeEvent.key && nativeEvent.key !== 'Enter') {
			return
		}
		const evt = { href, as, nativeEvent }
		evt.inApp = as === to
		if (onClick) {
			onClick(nativeEvent)
		}
		fireGlobalEvent('link', evt)
	}

	if (to) {
		// Internal link
		if (as) {
			/* eslint-disable jsx-a11y/anchor-is-valid */
			return (
				<NextLink
					href={href}
					as={as}
					{...otherProps}>
					<a
						className={`root link ${className}`}
						target={external && '_blank'}
						tabIndex='0'
						role='link'
						onKeyUp={onClickOrKeyUp}
						onClick={onClickOrKeyUp}>
						<style jsx>{`
							.root {
								//display: block;
								cursor: pointer;
							}
						`}</style>
						{children}
					</a>
				</NextLink>
			)
			/* eslint-enable jsx-a11y/anchor-is-valid */
		}
		// External link *
		// (*) The only reason why we need to process the external link
		// differently (not wrapping the <a> in a <NextLink>) is because when
		// the NextLink get's exported as a static HTML, it always adds a
		// trainling slash, and that may break the external link. This sucks
		// but there's a reasoning behind it, see: https://github.com/zeit/next.js/issues/2862
		return (
			<a
				className={`root link external ${className}`}
				target={external && '_blank'}
				href={href}
				onClick={onClickOrKeyUp}
				{...otherProps}>
				<style jsx>{`
					.root {
						cursor: pointer;
					}
				`}</style>
				{children}
			</a>
		)
	}

	return (
		<span
			className={`root link ${className}`}
			tabIndex='0'
			role='link'
			onKeyUp={onClickOrKeyUp}
			onClick={onClickOrKeyUp}
			{...otherProps}>
			<style jsx>{`
				.root {
					// display: block;
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
