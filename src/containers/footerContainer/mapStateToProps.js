import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	cookiePolicyTitle  : makeStringSelector('cookie-policy.base.title'),
	privacyPolicyTitle : makeStringSelector('privacy-policy.base.title'),
	termsOfUseTitle    : makeStringSelector('terms-of-use.base.title'),
	cookiePolicyUrl    : makeStringSelector('cookie-policy.url'),
	privacyPolicyUrl   : makeStringSelector('privacy-policy.url'),
	termsOfUseUrl      : makeStringSelector('terms-of-use.url'),
})
