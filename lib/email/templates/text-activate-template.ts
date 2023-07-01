import { TemplateProps } from './template-props'

const textTemplate = (signup: TemplateProps) => `
Activate your ${signup.productName} subscription

Thank you for signing up for ${signup.productName}! To activate your subscription, please click the link below:

${signup.actionUrl}

If you did not request this email, please ignore it.

Best regards,
The ${signup.productName} team
`

export default textTemplate