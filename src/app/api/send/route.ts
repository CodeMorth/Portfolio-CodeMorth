import { EmailTemplate } from '@/components/global';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {

    const {NAME, EMAIL, MESSAGE} = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['codemorth@gmail.com'],
      subject: NAME,
      react: EmailTemplate({ NAME, EMAIL, MESSAGE }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data,{status:200});
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
