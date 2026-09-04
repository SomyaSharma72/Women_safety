import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Server configuration error: RESEND_API_KEY is not configured.');
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Deliver survivor email OTP verification code via Resend Node SDK
 * Never logs or prints the OTP code.
 */
export async function sendOtpEmail(toEmail: string, otp: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Server configuration error: RESEND_API_KEY is not configured on this server. Email delivery cannot proceed.');
  }

  const resend = getResendClient();
  const subject = 'Silent Shield verification code';
  const textBody = `Your Silent Shield verification code is: ${otp}\n\nThis code expires in 10 minutes.\n\nIf you did not request this code, you can safely ignore this email.`;

  const { error } = await resend.emails.send({
    from: 'Silent Shield <onboarding@resend.dev>',
    to: toEmail.toLowerCase().trim(),
    subject,
    text: textBody,
  });

  if (error) {
    console.error('[Resend Delivery Error]', error.message || error);
    throw new Error(`Email delivery failed: ${error.message || 'Unknown provider error'}`);
  }
}
