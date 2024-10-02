/**
 * Generates a text class string based on hover state and position.
 *
 * @param {boolean} hover - Indicates if the text is currently hovered.
 * @param {string} leftOrigth - The original position of the text ('left' or 'right').
 * @returns {string} - The constructed class string for styling text.
 */
export const getTextClass = (hover: boolean, leftOrigth: string) => {
  // Base class applied to the text regardless of hover state or position
  const baseClass =
    'transform-text-front-movile hover:transform-text-back-movile laptop:transform-text-front-laptop';

  // Determine the hover class based on the hover state and text position
  const hoverClass = hover
    ? leftOrigth === 'left' // If hovered and text is on the left
      ? 'laptop:transform-text-back-left-laptop' // Apply left hover class
      : 'laptop:transform-text-back-right-laptop' // Otherwise apply right hover class
    : ''; // No hover class if not hovered

  // Construct the final class string combining base, hover, and position-specific classes
  return ` ${baseClass} ${hoverClass} ${
    leftOrigth === 'left' ? 'laptop:text-left' : 'laptop:text-right'
  }`;
};
