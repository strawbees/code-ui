import Package from 'root/package.json'

const Footer = () =>
	<div className='root footer'>
		<div className='version'>
			v{Package.version}
		</div>
	</div>

Footer.defaultProps = {}

Footer.propTypes = {}

export default Footer
