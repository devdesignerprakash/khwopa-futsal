import nodemailer from 'nodemailer'

export async function sendEmail(email:string){
    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    // Nodemailer can fetch accessToken automatically
  },
});

await  transporter.sendMail({
  from: `"My App" <${process.env.GMAIL_USER}>`,
  to: email,
  subject: "Hello with OAuth2",
  text: "This email was sent using Gmail OAuth2!",
});
}