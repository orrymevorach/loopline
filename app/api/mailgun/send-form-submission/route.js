import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { fields = {}, formName = '' } = await request.json();
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  const fieldData = Object.entries(fields)
    .map(
      ([key, value]) => `<div style="margin: 10px 0;">
        <p style="color:#999999;text-transform:lowercase;font-size:14px;margin:0;">${key}</p>
        <p style="font-size:16px;margin:0;">${value}</p>
      </div>`,
    )
    .join('');

  await transporter.sendMail({
    from: 'Loopline Form Submission noreply@loopline.com',
    to: 'hello@loopline.com',
    subject: `${formName} Submission`,
    html: `<div style="width:550px;margin:0 auto;display:block">
      <h2 style="font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:24px">New ${formName} Submission for Loopline</h2>
      ${fieldData}
      <p style="font-size:16px;"><a href="mailto:${fields.email}">Click here</a> to reply to ${fields.name}</p>
    </div>`,
  });

  return NextResponse.json({ success: true });
}
