import nodemailer from 'nodemailer'

export type Email = {
  displayName?: string
  from: string
  to: string
  subject: string
  text: string
  html: string
}

export async function sendEmail(email: Email) {
  const smtpPort = process.env.SMTP_PORT || '465'
  const smtpHostName = process.env.SMTP_HOST || 'mail.gandi.net'
  const smtpUser = process.env.SMTP_USER || 'your_username'
  const smtpPassword = process.env.SMTP_PASSWORD || 'your_password'

  console.log('⚙️ smtpPort', smtpPort)
  console.log('⚙️ smtpHostName', smtpHostName)
  console.log('⚙️ smtpUser', smtpUser)
  // anonymize password before logging
  const anonymizedPassword = smtpPassword.replace(/./g, '*')
  console.log('⚙️ smtpPassword', anonymizedPassword)

  const transporter = nodemailer.createTransport({
    host: smtpHostName,
    port: parseInt(smtpPort, 10),
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  })

  const info = await transporter.sendMail({
    from: `"${email.displayName ?? ''} <${email.from}>`,
    to: email.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  })

  console.log('Message sent: %s', info.messageId)
}

const MAX_RETRIES = 5
const BASE_DELAY = 1000 // 1 second

export const sendEmailWithRetry = async (email: Email, retryCount = 0) => {
  try {
    await sendEmail(email)
    console.log(`emailSent`)
  } catch (error) {
    console.log(`🔥 error sending email (retry count: ${retryCount + 1})`)
    console.log(error)

    if (retryCount < MAX_RETRIES) {
      const delay = BASE_DELAY * 2 ** retryCount
      console.log(`Retrying in ${delay} ms...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      await sendEmailWithRetry(email, retryCount + 1)
    } else {
      console.log(
        `Reached maximum number of retries (${MAX_RETRIES}). Giving up.`
      )
      throw new Error(`Failed to send email after ${MAX_RETRIES} retries`)
    }
  }
}

/* To use this snippet, you need to create a .env file in the root of your project with the following content:

export const email: Email = {
  from: "agent@pandassur.com",
  to: "raphael.mansuy@gmail.com",
  subject: "Test Email",
  text: "This is a test email.",
  html: "<p>This is a test email.</p>"
}


SMTP_PORT=465
SMTP_HOST=mail.gandi.net
SMTP_USER=your_username
SMTP_PASSWORD=your_password



import { config } from 'dotenv';
config()

sendEmail(email)

/* usage 

sendEmail(email)

*/
