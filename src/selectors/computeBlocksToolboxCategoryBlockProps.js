export default (props, appProps) => ({
	type   : props.id,
	values : JSON.parse(props.toolboxValues)
})
