import nodemailer from 'nodemailer'

export async function sendEmail(email:string,otp:string){
  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_SECRET,
  },
});

await  transporter.sendMail({
  from: process.env.SENDER_MAIL,
  to: email,
  subject: "OTP",
  text: `your otp will expires in 5 minutes: ${otp}`,
});
}