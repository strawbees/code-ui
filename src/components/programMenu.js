import PropTypes from 'prop-types'
import IconButton from 'src/components/iconButton'
import ProgramMenuFrame from 'src/components/programMenuFrame'

const ProgramMenu = ({
	name,
	type,
	updatedAt,
	items,
}) =>
	<ProgramMenuFrame
		name={name}
		type={type}
		updatedAt={updatedAt}>
		{items && items.filter(item => item).map(({ icon, labelKey, onClick }) =>
			<IconButton
				key={labelKey}
				icon={icon}
				labelKey={labelKey}
				onClick={onClick}
			/>
		)}
	</ProgramMenuFrame>

ProgramMenu.propTypes = {
	name      : PropTypes.string,
	type      : PropTypes.string,
	updatedAt : PropTypes.string,
	items     : PropTypes.arrayOf(PropTypes.shape({
		icon     : PropTypes.func,
		labelKey : PropTypes.string,
		onClick  : PropTypes.func,
	}))
}

export default ProgramMenu
