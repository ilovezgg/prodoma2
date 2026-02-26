// pages/api/amo-send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, phone, description } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const accessToken = process.env.AMO_ACCESS_TOKEN;
  const subdomain = process.env.AMO_SUBDOMAIN || 'stepanovdanya2006';

  if (!accessToken) {
    console.error('AMO_ACCESS_TOKEN не задан в Environment Variables');
    return res.status(500).json({ error: 'Ошибка конфигурации' });
  }

  try {
    const leadData = {
      name: `Заявка от ${name}`,
      price: 0,
      _embedded: {
        contacts: [{
          first_name: name,
        custom_fields_values: [
  {
    field_id: 1373781, 
    values: [{ value: phone, enum_code: 'MOB' }]
  }
]
        }]
      }
    };

    const response = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([leadData])
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await response.json().catch(() => ({}));
      console.error('AmoCRM API error:', error);
      return res.status(500).json({ error: 'Ошибка AmoCRM' });
    }
  } catch (err) {
    console.error('Network error:', err);
    return res.status(500).json({ error: 'Ошибка сети' });
  }
}