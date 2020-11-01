const Figure = ({
	svg : SvgFile,
	x = 0,
	y = 0,
	angle = 0,
	opacity = 1,
	className = '',
}) => {
	if (!SvgFile) {
		return null
	}
	return (
		<div className={`root figure ${className}`}>
			<style jsx>{`
				.root {
					//transform-origin: 0% 0%;
					//transform: translate3d(${x}, ${y}, 0) rotateZ(${angle}deg);
					//opacity: ${opacity};
					//position: relative;
				}
				.root :global(svg) {
					//position: absolute;
					//transform: translate3d(-50%, -50%, 0);
				}
			`}</style>
			<SvgFile/>
		</div>
	)
}

export default Figure
