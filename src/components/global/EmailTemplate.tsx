interface EmailTemplateProps {
  NAME: string
  EMAIL: string
  MESSAGE: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  NAME,
  EMAIL,
  MESSAGE
}) => (
  <div>
    <h1>
      Hola kevin, soy {NAME}, mi correo es {EMAIL} y mi mensaje es {MESSAGE}
    </h1>
  </div>
)
