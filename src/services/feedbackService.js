import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/email.js';

export async function sendFeedback(feedback, userEmail = '') {
  // Always provide the direct email option in error messages
  const directEmailMsg = 'Please send your feedback directly to m.rajan.selva@gmail.com';
  
  if (!emailConfig.isConfigured()) {
    throw new Error(`Email service not configured. ${directEmailMsg}`);
  }

  try {
    emailjs.init(emailConfig.publicKey);
    
    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      {
        to_email: 'm.rajan.selva@gmail.com',
        from_email: userEmail || 'anonymous@user.com',
        feedback,
        timestamp: new Date().toLocaleString()
      }
    );
    return true;
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw new Error(`Unable to send feedback. ${directEmailMsg}`);
  }
}