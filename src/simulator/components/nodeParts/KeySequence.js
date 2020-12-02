import PropTypes from 'prop-types'
import KeyPress from './KeyPress'

import {
	NO_KEY,
} from '../../quirkbotArduinoLibrary/Quirkbot'

export const KeySequence = ({
	scheduleKey,
}) => {
	const keys = JSON.parse(scheduleKey)
		.filter(key => key && key !== NO_KEY)
	return keys.map((key) =>
		<KeyPress
			key={key}
			keyValue={key}
			pressed={true}
		/>
	)
}
KeySequence.defaultProps = {
	scheduleKey : '[]',
}

KeySequence.propTypes = {
	scheduleKey : PropTypes.string,
}

export default KeySequence
