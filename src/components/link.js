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

	const onClickOrEnter = (nativeEvent) => {
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
					onKeyUp={onClickOrEnter}
					onClick={onClickOrEnter}>
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
		/* eslint-enable jsx-a11y/anchor-is-valid */
	}

	return (
		<span
			className={`root link ${className}`}
			tabIndex='0'
			role='link'
			onKeyUp={onClickOrEnter}
			onClick={onClickOrEnter}
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
