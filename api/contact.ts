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
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a; padding: 40px 20px; color: #f3f4f6; text-align: center;">
          <div style="max-width: 550px; margin: 0 auto; background: #171717; border: 1px solid #333333; border-radius: 8px; overflow: hidden; text-align: left; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
            
            <div style="padding: 35px 30px 25px 30px; border-bottom: 1px solid #262626; text-align: center; background-color: #0f0f0f;">
              <!-- Asegúrate de reemplazar 'https://www.tudominio.com' por tu dominio real donde esté alojada la imagen -->
              <img src="https://tudominio.com/assets/sparktree-horizontal.png" alt="Sparktree Logo" style="max-width: 180px; height: auto;" />
              <h2 style="margin: 25px 0 0 0; color: #41f0a5; font-size: 16px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Nueva Solicitud de Contacto</h2>
            </div>

            <div style="padding: 35px 30px;">
              <p style="font-size: 14px; color: #a3a3a3; margin-bottom: 30px; line-height: 1.5;">Se ha registrado una nueva consulta a través del sitio web. A continuación se detallan los datos del prospecto:</p>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #d4d4d4;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373; width: 40%;">Nombre Completo:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; font-weight: 600; color: #ffffff;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373;">Correo Electrónico:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; font-weight: 600;"><a href="mailto:${email}" style="color: #41f0a5; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373;">Teléfono de Contacto:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; font-weight: 600;"><a href="tel:${phone}" style="color: #41f0a5; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373;">Empresa:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; font-weight: 600; color: #ffffff;">${company || 'No especificada'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373;">Servicios Requeridos:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; font-weight: 600; color: #ffffff;">${service && service.length > 0 ? service.join(', ') : 'No especificado'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373;">Presupuesto Estimado:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; font-weight: 600; color: #41f0a5;">${budget || 'No especificado'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373;">Plazo del Proyecto:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #262626; font-weight: 600; color: #ffffff;">${timeline || 'No especificado'}</td>
                </tr>
              </table>

              <div style="margin-top: 35px; background-color: #262626; padding: 20px 24px; border-radius: 6px; border-left: 3px solid #41f0a5;">
                <h3 style="margin-top: 0; margin-bottom: 10px; color: #ffffff; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje Adjunto:</h3>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; background-color: #0f0f0f; border-top: 1px solid #262626; font-size: 12px; color: #525252;">
              Este es un correo automatizado generado por el sistema de <strong>Sparktree</strong>.
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
