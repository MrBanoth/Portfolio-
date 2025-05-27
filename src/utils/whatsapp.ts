// WhatsApp Webhook Configuration
export const WHATSAPP_WEBHOOK_URL = 'YOUR_WHATSAPP_WEBHOOK_URL'; // You'll need to set up a service like Twilio or a similar webhook service

// Function to send WhatsApp notification
export const sendWhatsAppNotification = async (message: string) => {
  if (!WHATSAPP_WEBHOOK_URL) {
    console.warn('WhatsApp webhook URL not configured');
    return;
  }

  try {
    const response = await fetch(WHATSAPP_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: '919390730129', // Your WhatsApp number without + or country code
        message: message
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    throw error;
  }
};
