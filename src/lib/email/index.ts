const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

interface SendEmailProps {
  recipient: string;
  sender: string;
  html: string;
  subject: string;
}

export const sendEmail = async ({ recipient, sender, subject, html }: SendEmailProps) => {
  const message = {
    to: recipient,
    from: sender,
    subject: subject,
    html,
  };
  try {
    await sgMail.send(message);
    console.log('Email Sent');
  } catch (e) {
    console.log('Failure on sending email: ', e);
  }
};
