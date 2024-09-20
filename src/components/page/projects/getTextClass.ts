export const getTextClass = (hover: boolean, leftOrigth: string) => {
  const baseClass =
    'transform-text-front-movile hover:transform-text-back-movile laptop:transform-text-front-laptop'
  const hoverClass = hover
    ? leftOrigth === 'left'
      ? 'laptop:transform-text-back-left-laptop'
      : 'laptop:transform-text-back-right-laptop'
    : ''

  return ` ${baseClass} ${hoverClass} ${
    leftOrigth === 'left' ? 'laptop:text-left' : 'laptop:text-right'
  }`
}
