import { Resend } from 'resend';

const resend = new Resend('re_VmGcpa82_GSABX5PaNERWkKBhVBpgSd54');

export default async function handler(req: any, res: any) {
  // Configuración para evitar problemas de CORS si es necesario (opcional)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, phone, company, service, budget, timeline, message } = req.body;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sparktree.rs@gmail.com',
      subject: `Nuevo contacto: ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
        <p><strong>Servicios:</strong> ${service && service.length > 0 ? service.join(', ') : 'No especificado'}</p>
        <p><strong>Presupuesto:</strong> ${budget || 'No especificado'}</p>
        <p><strong>Plazo:</strong> ${timeline || 'No especificado'}</p>
        <p><strong>Mensaje:</strong><br/> ${message}</p>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Error interno del servidor' });
  }
}
