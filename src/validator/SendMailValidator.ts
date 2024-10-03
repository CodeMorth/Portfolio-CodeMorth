import { z } from 'zod';

export const LoginValidator = z.object({
  EMAIL: z.string().email('Correo electrónico inválido').nonempty('El correo electrónico es requerido'),
  NAME: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').nonempty('La contraseña es requerida'),
  MESSAGE: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').nonempty('La contraseña es requerida'),
});
