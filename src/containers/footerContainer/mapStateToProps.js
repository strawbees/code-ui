import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'

export default () => createStructuredSelector({
	cookiePolicyTitle  : makeStringSelector('md.cookie-policy.base.title'),
	privacyPolicyTitle : makeStringSelector('md.privacy-policy.base.title'),
	termsOfUseTitle    : makeStringSelector('md.terms-of-use.base.title'),
	cookiePolicyUrl    : makeInternalUrlStringSelector('md.cookie-policy.url'),
	privacyPolicyUrl   : makeInternalUrlStringSelector('md.privacy-policy.url'),
	termsOfUseUrl      : makeInternalUrlStringSelector('md.terms-of-use.url'),
})
