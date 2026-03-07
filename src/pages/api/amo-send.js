// pages/api/amo-send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, phone, description, pipeline_id } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const accessToken = process.env.AMO_ACCESS_TOKEN;
  const subdomain = process.env.AMO_SUBDOMAIN || 'inmyhands333';

  if (!accessToken) {
    console.error('AMO_ACCESS_TOKEN не задан в Environment Variables');
    return res.status(500).json({ error: 'Ошибка конфигурации' });
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Создаём сделку с контактом
    const leadName = pipeline_id === 10642434
      ? `Квиз: подбор проекта — ${name}`
      : `Заявка с сайта — ${name}`;

    const leadData = {
      name: leadName,
      price: 0,
      ...(pipeline_id && { pipeline_id }),
      _embedded: {
        contacts: [{
          first_name: name,
          custom_fields_values: [
            {
              field_id: 1373781,
              values: [{ value: phone, enum_code: 'MOB' }],
            },
          ],
        }],
      },
    };

    const leadRes = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads/complex`, {
      method: 'POST',
      headers,
      body: JSON.stringify([leadData]),
    });

    if (!leadRes.ok) {
      const error = await leadRes.json().catch(() => ({}));
      console.error('AmoCRM leads error:', error);
      return res.status(500).json({ error: 'Ошибка создания сделки' });
    }

    const leadJson = await leadRes.json();
    const leadId = leadJson?.[0]?.id;

  
    if (leadId && description) {
      const noteRes = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads/${leadId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify([{
          note_type: 'common',
          params: { text: description },
        }]),
      });
      if (!noteRes.ok) {
        const noteErr = await noteRes.json().catch(() => ({}));
        console.error('AmoCRM note error:', noteErr);
      }
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Network error:', err);
    return res.status(500).json({ error: 'Ошибка сети' });
  }
}