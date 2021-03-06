const SvgIcon = ({ icon : Icon, className = '' }) => {
	if (!Icon) {
		return null
	}
	return (
		<div className={`root svgIcon ${className}`}>
			<style jsx>{`
				.root {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 1rem;
					width: 1rem;
					position: relative;
				}
				.root :global(svg) {
					height: 100%;
					width: 100%;
				}
			`}</style>
			<Icon/>
		</div>
	)
}

export default SvgIcon
