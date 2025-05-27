// WhatsApp helper functions
const CALL_ME_BOT_API_KEY = 'YOUR_CALLMEBOT_API_KEY'; // Get this from CallMeBot
const YOUR_WHATSAPP_NUMBER = '919390730129'; // Your WhatsApp number with country code, no +

export const createWhatsAppLink = (phone: string, message: string): string => {
  // Format: https://wa.me/PHONE_NUMBER?text=URL_ENCODED_MESSAGE
  const formattedPhone = phone.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

export const sendAutoReply = async (phone: string, name: string): Promise<void> => {
  const message = encodeURIComponent(
    `Hi ${name}! Thank you for reaching out. I've received your message and will get back to you soon.`
  );
  
  try {
    // This will send a message from your WhatsApp to the user
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${CALL_ME_BOT_API_KEY}`
    );
    
    // Also send yourself a notification
    const notificationMsg = encodeURIComponent(
      `New contact form submission from ${name} (${phone})`
    );
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${YOUR_WHATSAPP_NUMBER}&text=${notificationMsg}&apikey=${CALL_ME_BOT_API_KEY}`
    );
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
