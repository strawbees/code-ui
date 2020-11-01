const Figure = ({
	svg : SvgFile,
	x = 0,
	y = 0,
	angle = 0,
	opacity = 1,
	scale = 1,
	className = '',
}) => {
	if (!SvgFile) {
		return null
	}
	return (
		<div className={`root figure ${className}`}>
			<style jsx>{`
				.root {
					//position: absolute;
					//transform-origin: 0% 0%;
					transform: translate3d(${x}px, ${y}px, 0) rotateZ(${angle}deg) scale3d(${scale},${scale},${scale});
					opacity: ${opacity};
				}
				.root :global(svg) {
					position: absolute;
					transform: translate3d(-50%, -50%, 0);
				}
			`}</style>
			<SvgFile/>
		</div>
	)
}

export default Figure
