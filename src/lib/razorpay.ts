import Razorpay from 'razorpay';
import crypto from 'crypto';

const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_DhigaaBoutique123';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'DhigaaSecretKeyDemo987654';

export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!keySecret) return false;
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(body.toString())
    .digest('hex');
  return expectedSignature === signature;
}

export function verifyWebhookSignature(
  payload: string,
  webhookSignature: string,
  webhookSecret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex');
  return expectedSignature === webhookSignature;
}

