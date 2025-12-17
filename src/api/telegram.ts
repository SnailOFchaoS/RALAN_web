// TODO: Перенести на бэкенд! Токен виден в клиентском коде

const BOT_TOKEN = '';

const CHAT_IDS = [
  ''
];


interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
}

const sendToChat = async (chatId: string, message: string): Promise<boolean> => {
  if (!BOT_TOKEN) {
    console.error('Telegram BOT_TOKEN is not configured');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const sendContactForm = async (formData: ContactFormData): Promise<boolean> => {
  if (!BOT_TOKEN || CHAT_IDS.length === 0) {
    console.error('Telegram is not configured: missing BOT_TOKEN or CHAT_IDS');
    return false;
  }

  const message = `
🏃 <b>Новая заявка с сайта RALAN</b>

👤 <b>ФИО:</b> ${formData.fullName}
📱 <b>Телефон:</b> ${formData.phone}
📧 <b>Email:</b> ${formData.email}

📅 <b>Дата:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
  `.trim();

  try {
    const results = await Promise.all(
      CHAT_IDS.map(chatId => sendToChat(chatId, message))
    );
    return results.some(result => result === true);
  } catch {
    return false;
  }
};

