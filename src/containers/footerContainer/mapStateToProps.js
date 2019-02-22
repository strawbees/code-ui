import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	cookiePolicyTitle  : makeStringSelector('md.cookie-policy.base.title'),
	privacyPolicyTitle : makeStringSelector('md.privacy-policy.base.title'),
	termsOfUseTitle    : makeStringSelector('md.terms-of-use.base.title'),
	cookiePolicyUrl    : makeStringSelector('routes.md.cookie-policy'),
	privacyPolicyUrl   : makeStringSelector('routes.md.privacy-policy'),
	termsOfUseUrl      : makeStringSelector('routes.md.terms-of-use'),
})
