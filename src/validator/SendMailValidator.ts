import { z } from 'zod';

export const LoginValidator = z.object({
  EMAIL: z.string().email('Correo electrónico inválido').min(1,'El correo electrónico es requerido'),
  NAME: z.string().min(1, 'El nombre es requerido'),
  MESSAGE: z.string().min(1, 'El mensaje es requerido'),
});
