import Link from 'src/components/link'

export default ({ current, alternatives }) =>
	<div className='root localesMenu'>
		<style jsx>{`

		`}</style>
		<Link>
			{current.title}
		</Link>
		{alternatives.map(({ title, url }, key) =>
			<Link
				key={key}
				to={url}>
				{title}
			</Link>
		)}
	</div>
