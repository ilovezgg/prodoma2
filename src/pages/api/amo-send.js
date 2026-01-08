// pages/api/amo-send.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase, ref, get, set } from 'firebase-admin/database';

// Инициализация Firebase (только один раз)
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
  }
}

const db = getDatabase(app);

// Получение токенов из Firebase
async function getTokens() {
  try {
    const snapshot = await get(ref(db, 'tokens'));
    return snapshot.val();
  } catch (err) {
    console.error('Ошибка чтения токенов:', err);
    return null;
  }
}

// Сохранение токенов в Firebase
async function saveTokens(tokens) {
  try {
    await set(ref(db, 'tokens'), tokens);
  } catch (err) {
    console.error('Ошибка сохранения токенов:', err);
    throw err;
  }
}

// Обновление access_token через refresh_token
async function refreshAccessToken(refreshToken) {
  const res = await fetch('https://stepanovdanya2006.amocrm.ru/oauth2/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AMO_CLIENT_ID,
      client_secret: process.env.AMO_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: process.вн.AMO_REDIRECT_URI
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

// Основной обработчик
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, phone, description } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  try {
    // Получаем токены
    let tokens = await getTokens();
    if (!tokens || !tokens.refresh_token) {
      throw new Error('Токены не найдены. Выполните первоначальную авторизацию.');
    }

    // Обновляем токен, если нужно
    if (Date.now() >= tokens.expires_at - 60000) {
      console.log('Токен истекает — обновляем...');
      tokens = await refreshAccessToken(tokens.refresh_token);
    }

    // Отправляем лид в AmoCRM
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
              { field_id: 1480715, values: [{ value: phone }] } // Твой ID телефона
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