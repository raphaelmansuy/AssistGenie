import { TemplateProps } from './template-props'

const htmlTemplate = (signin: TemplateProps) => `
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
    <h1>Welcome to ${signin.productName}!</h1>
    <p>You have successfully signed in to ${signin.productName}. To access your account, please click the link below:</p>
    <p><a href="${signin.actionUrl}">${signin.actionUrl}</a></p>
    <p>If you did not sign in to ${signin.productName}, please contact us immediately.</p>
    <p>Best regards,</p>
    <p>The ${signin.productName} team</p>
  </div>
</body>
</html>`

export default htmlTemplate