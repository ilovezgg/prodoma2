// pages/api/amo-send.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

let app;
if (!app) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    app = initializeApp({
      credential: cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } catch (err) {
    console.error('Ошибка инициализации Firebase:', err);
    throw new Error('Не удалось инициализировать Firebase');
  }
}

const db = getDatabase(app);

// Вспомогательные функции для работы с Realtime Database
async function getTokens() {
  const dataRef = db.ref('tokens');
  try {
    const snapshot = await dataRef.once('value');
    return snapshot.val();
  } catch (err) {
    console.error('Ошибка чтения токенов:', err);
    return null;
  }
}

async function saveTokens(tokens) {
  const dataRef = db.ref('tokens');
  try {
    await dataRef.set(tokens);
  } catch (err) {
    console.error('Ошибка сохранения токенов:', err);
    throw err;
  }
}

async function refreshAccessToken(refreshToken) {
  const res = await fetch('https://stepanovdanya2006.amocrm.ru/oauth2/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AMO_CLIENT_ID,
      client_secret: process.env.AMO_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: process.env.AMO_REDIRECT_URI
    })
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error('Ошибка обновления токена:', error);
    throw new Error('Не удалось обновить access_token');
  }

  const tokens = await res.json();
  tokens.expires_at = Date.now() + tokens.expires_in * 1000;
  await saveTokens(tokens);
  return tokens;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, phone, description } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  try {
    let tokens = await getTokens();
    if (!tokens || !tokens.refresh_token) {
      console.error('Токены не найдены в Firebase');
      throw new Error('Токены не найдены. Убедитесь, что в Firebase есть объект "tokens".');
    }

    if (Date.now() >= tokens.expires_at - 60000) {
      console.log('Токен истекает — обновляем...');
      tokens = await refreshAccessToken(tokens.refresh_token);
    }

    const leadRes = await fetch(`https://stepanovdanya2006.amocrm.ru/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{
        name: `Заявка от ${name}`,
        price: 0,
        _embedded: {
          contacts: [{
            first_name: name,
            custom_fields_values: [
              { field_id: 1480715, values: [{ value: phone }] }
            ]
          }]
        }
      }])
    });

    if (leadRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await leadRes.json().catch(() => ({}));
      console.error('AmoCRM ошибка:', error);
      return res.status(500).json({ error: 'Ошибка AmoCRM' });
    }
  } catch (err) {
    console.error('Серверная ошибка:', err.message);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}