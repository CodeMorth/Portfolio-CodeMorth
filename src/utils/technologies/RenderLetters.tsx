// Auxiliary function to map letters to styles based on colors
export const RenderLetters = (text: string, colors: string[]) => {
  // Convert the input text into an array of letters and map each letter to a styled <h1> element
  return Array.from(text).map((letter, index) => (
    // Render each letter in a <h1> tag with a color based on its index
    <h1 style={{ color: colors[index % colors.length] }} key={index}>
      {/* Display the current letter */}
      {letter}
    </h1>
  ))
}
