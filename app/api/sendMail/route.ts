import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as React from 'react';

const fromEmail = process.env.FROM_EMAIL;
const fromPass = process.env.FROM_PASS;
export async function POST(req : any, res : any) {
  try {
    console.log(fromEmail,fromPass);
    const { companyEmail,companyName, candidateName ,candidateEmail, status , jobTitle} = await req.json();
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: fromEmail,
        pass: fromPass,
      },
    });

    // Define email data
    const mailOptions = {
      from: fromEmail,
      to: [fromEmail,companyEmail , candidateEmail],
      subject: status,
      html: `
        <div>
          <h1>${candidateName} you are ${status}</h1>
          <p>Thank you for contacting us!</p>
          <p>This message is submitted</p>
          <p> you have been ${status} for the ${jobTitle} in ${companyName} </p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
