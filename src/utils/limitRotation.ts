// Función para limitar los valores de inclinación

export const limitRotation = (value: number, limit: number) =>
  Math.min(Math.max(value, -limit), limit)
