import { EmailTemplate } from '@/components/global';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {

    const {NAME, EMAIL, MESSAGE} = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['kevinsalinasvd@gmail.com'],
      subject: NAME,
      react: EmailTemplate({ NAME, EMAIL, MESSAGE }),
    });

    if (error) {
    console.log("error",error)

      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data,{status:200});
  } catch (error) {
    console.log("error",error)
    return Response.json({ error }, { status: 500 });
  }
}
