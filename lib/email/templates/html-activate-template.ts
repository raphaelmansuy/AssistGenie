import { TemplateProps } from './template-props'

const htmlTemplate = (signup: TemplateProps) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f8f8f8;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 5px;
    }
    h1, h2 {
      margin-bottom: 20px;
      font-weight: normal;
      color: #333;
    }
    p {
      margin-bottom: 10px;
    }
    b {
      font-weight: bold;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Activate your ${signup.productName} subscription</h1>
    <p>Thank you for signing up for ${signup.productName}! To activate your subscription, please click the link below:</p>
    <p><a href="${signup.actionUrl}">${signup.actionUrl}</a></p>
    <p>If you did not request this email, please ignore it.</p>
    <p>Best regards,</p>
    <p>The ${signup.productName} team</p>
  </div>
</body>
</html>`

export default htmlTemplate
