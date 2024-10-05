// Import the EmailTemplate component from the global components directory
import { EmailTemplate } from '@/components/global'
// Import the Resend library for sending emails
import { Resend } from 'resend'

// Initialize a new Resend instance with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

// Define the POST function that handles incoming requests
export async function POST(request: Request) {
  // Parse the incoming JSON request body to extract NAME, EMAIL, and MESSAGE
  const { NAME, EMAIL, MESSAGE } = await request.json()

  try {
    // Send an email using the Resend API
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Set the sender's email address
      to: ['codemorth@gmail.com'], // Specify the recipient's email address
      subject: NAME, // Use the NAME as the email subject
      react: EmailTemplate({ NAME, EMAIL, MESSAGE }) // Render the email content using the EmailTemplate component
    })

    // Check if there was an error sending the email
    if (error) {
      // Return a 500 error response if there's an error
      return Response.json({ error }, { status: 500 })
    }

    // Return the email data with a 200 status code if successful
    return Response.json(data, { status: 200 })
  } catch (error) {
    // Catch any unexpected errors and return a 500 error response
    return Response.json({ error }, { status: 500 })
  }
}
