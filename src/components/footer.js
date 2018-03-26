import Package from 'root/package.json'

export default ({ appProps }) =>
	<div className='root footer'>
		<style jsx>{`

		`}</style>
		<div className='version'>
			v{Package.version}
		</div>
	</div>
