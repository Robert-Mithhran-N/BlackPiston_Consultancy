import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  const isPlaceholder =
    !process.env.EMAIL_USER ||
    process.env.EMAIL_USER.includes("your-email@gmail.com") ||
    !process.env.EMAIL_PASS ||
    process.env.EMAIL_PASS.includes("your-app-password");

  if (isPlaceholder) {
    console.log(`\n==================================================`);
    console.log(`📧  [EMAIL MOCK] Sending OTP to: ${email}`);
    console.log(`🔑  OTP Code: ${otp}`);
    console.log(`⏱️   Expires in: 10 minutes`);
    console.log(`==================================================\n`);
    return { success: true, mock: true };
  }

  await transporter.sendMail({
    from: `"BlackPiston" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "BlackPiston Password Reset OTP",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #d4af37; margin: 0; font-family: Georgia, serif; font-size: 28px; letter-spacing: 1px;">BLACKPISTON</h2>
          <p style="color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 4px 0 0 0;">Management Console</p>
        </div>
        <div style="border-top: 2px solid #d4af37; padding-top: 24px; color: #2d3748; line-height: 1.6;">
          <p>Hello,</p>
          <p>You requested a password reset for your admin account. Please use the following 6-digit One-Time Password (OTP) to proceed. This OTP is valid for <strong>10 minutes</strong>:</p>
          <div style="text-align: center; margin: 32px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1a202c; padding: 12px 28px; border-radius: 8px; background-color: #f7fafc; border: 1px solid #e2e8f0; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p>If you did not request this password reset, please secure your account credentials immediately.</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        <p style="font-size: 11px; color: #a0aec0; text-align: center; margin: 0;">This is an automated transmission from BlackPiston. Please do not reply directly to this email.</p>
      </div>
    `,
  });

  return { success: true, mock: false };
};

export default transporter;
