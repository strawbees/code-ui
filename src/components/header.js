import Link from 'src/components/link'
import LocalesMenu from 'src/components/localesMenu'

export default ({
	homeUrl,
	flowUrl,
	scratchUrl,
	textUrl,
	localesMenu
}) =>
	<div className='root header'>
		<style jsx>{`
			.wrapper {
				display: flex;
				flex-direction: row;
			}
		`}</style>
		<div className='wrapper'>
			<Link to={homeUrl}>
				home
			</Link>
			<Link to={flowUrl}>
				flow
			</Link>
			<Link to={scratchUrl}>
				scratch
			</Link>
			<Link to={textUrl}>
				text
			</Link>
			<LocalesMenu {...localesMenu}/>
		</div>
	</div>
