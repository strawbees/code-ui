import { connect } from 'react-redux'
import AccountSettings from 'src/components/accountSettings'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const AccountSettingsContainer = (props) =>
	<AccountSettings {...props} />

const accountSettingsContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(AccountSettingsContainer)

export default accountSettingsContainerConnected
