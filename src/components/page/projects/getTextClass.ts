export const getTextClass = (isHovered: boolean, leftOrigth: string) => {
  const baseClass =
    'transform-text-front-movile laptop:transform-text-front-laptop'
  const hoverClass = isHovered
    ? leftOrigth === 'left'
      ? 'transform-text-back-movile laptop:transform-text-back-left-laptop'
      : 'transform-text-back-movile laptop:transform-text-back-right-laptop'
    : ''

  return `text-description ${baseClass} ${hoverClass} ${
    leftOrigth === 'left' ? 'laptop:text-left' : 'laptop:text-right'
  }`
}
