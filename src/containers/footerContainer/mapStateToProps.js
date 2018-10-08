import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	cookiePolicyTitle  : makeStringSelector('md.cookie-policy.base.title'),
	privacyPolicyTitle : makeStringSelector('md.privacy-policy.base.title'),
	termsOfUseTitle    : makeStringSelector('md.terms-of-use.base.title'),
	cookiePolicyUrl    : makeStringSelector('md.cookie-policy.url'),
	privacyPolicyUrl   : makeStringSelector('md.privacy-policy.url'),
	termsOfUseUrl      : makeStringSelector('md.terms-of-use.url'),
})
