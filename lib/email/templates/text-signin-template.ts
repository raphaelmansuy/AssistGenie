import { TemplateProps } from './template-props'

const textTemplate = (signin: TemplateProps) => `
Welcome to ${signin.productName}!

You have successfully signed in to ${signin.productName}. To access your account, please click the link below:

${signin.actionUrl}

If you did not sign in to ${signin.productName}, please contact us immediately.

Best regards,
The ${signin.productName} team
`

export default textTemplate