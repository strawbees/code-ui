import PropTypes from 'prop-types'
import DelayedInput from 'src/editors/flow/components/delayedInput'

const InstanceName = ({
	name,
	onNameInputChange,
}) =>
	<div className='root instanceName'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.root :global(>.delayedInput input) {
				font-size: 0.7rem;
				max-width: 10rem;
			}
		`}</style>
		<DelayedInput
			value={name}
			onChange={onNameInputChange}
			autoResize={true}
		/>
	</div>


InstanceName.propTypes = {
	name              : PropTypes.string,
	onNameInputChange : PropTypes.func,
}

export default InstanceName
