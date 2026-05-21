import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

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
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #334155;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
            <div style="background-color: #41f0a5; padding: 30px; text-align: center;">
              <h2 style="margin: 0; color: #0f172a; font-size: 26px; font-weight: 800;">¡Nuevo Contacto! 🚀</h2>
            </div>
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #475569;">Alguien acaba de enviar un mensaje a través del formulario de la web. Aquí están los detalles del prospecto:</p>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>🧑 Nombre:</strong></td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 600; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>✉️ Email:</strong></td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 600;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>📞 Teléfono:</strong></td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 600;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>🏢 Empresa:</strong></td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 600; color: #0f172a;">${company || 'No especificada'}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>🎯 Servicios:</strong></td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 600; color: #0f172a;">${service && service.length > 0 ? service.join(', ') : 'No especificado'}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>💰 Presupuesto:</strong></td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 600; color: #10b981;">${budget || 'No especificado'}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>⏱️ Plazo:</strong></td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 600; color: #0f172a;">${timeline || 'No especificado'}</td>
                </tr>
              </table>

              <div style="margin-top: 35px; background-color: #f8fafc; padding: 24px; border-radius: 12px; border-left: 4px solid #41f0a5;">
                <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; font-weight: 700;">📝 Mensaje del cliente:</h3>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Error interno del servidor' });
  }
}
