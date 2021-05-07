import PropTypes from 'prop-types'
import DropdownMenu from 'src/components/dropdownMenu'
import languageIcon from 'src/assets/icons/general/language.svg'

const LocalesMenu = ({
	options,
}) => {
	if (options.length <= 1) {
		return null
	}
	return (
		<DropdownMenu
			alignRight={true}
			responsiveHideLabel={true}
			icon={languageIcon}
			options={options}
		/>
	)
}

LocalesMenu.defaultProps = {
	options : [],
}

LocalesMenu.propTypes = {
	options : PropTypes.arrayOf(PropTypes.shape({
		label    : PropTypes.string,
		link     : PropTypes.string,
		disabled : PropTypes.bool,
	})),
}

export default LocalesMenu
