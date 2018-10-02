export default async (canvas, name) => {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera
	// for iphone
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		const url = canvas.toDataURL()
		const link = document.createElement('a')
		document.body.appendChild(link)
		link.href = url
		link.target = '_blank'
		link.onclick = () => {
			document.body.removeChild(link)
		}
		link.click()
	}
	const blob = await new Promise(r => canvas.toBlob(r))
	const link = document.createElement('a')
	document.body.appendChild(link)
	link.download = name
	link.href = URL.createObjectURL(blob)
	link.onclick = () => {
		document.body.removeChild(link)
		requestAnimationFrame(() => URL.revokeObjectURL(link.href))
	}
	link.click()
}
