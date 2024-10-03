import { useEffect, useState } from 'react'

// Function to render a string of letters with dynamic color mapping and animation
export const RenderLetters = (
  text: string, // Input text to display as individual letters
  colors: string[], // Array of colors to cycle through for each letter
  bgColor?: null | string, // Optional background color or gradient
  colorText?: null | string // Optional text color to override individual letter colors
) => {
  const [visibleLetters, setVisibleLetters] = useState<string[]>([]) // State to store letters as they appear

  useEffect(() => {
    // Clear the current visible letters before starting the animation
    setVisibleLetters([])

    const timeouts: NodeJS.Timeout[] = [] // Array to keep track of timeouts for cleanup

    // Split the text into individual letters and display them one by one with a delay
    text.split('').forEach((letter, index) => {
      const timeout = setTimeout(() => {
        // Add the next letter to the visibleLetters array
        setVisibleLetters((prev) => [...prev, letter])
      }, index * 30) // Set a delay for each letter (30ms per letter)
      timeouts.push(timeout) // Save the timeout for cleanup later
    })

    // Cleanup function to clear timeouts when the component unmounts or the text changes
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout)) // Clear all active timeouts
    }
  }, [text]) // The effect runs every time `text` changes

  return (
    <div
      className="text-hover"
      style={{
        backgroundImage: bgColor ? bgColor : undefined, // Set background image if bgColor is a gradient
        backgroundColor:
          bgColor && !bgColor.includes('linear-gradient') ? bgColor : undefined // Set background color only if not a gradient
      }}
    >
      {visibleLetters.map((letter, index) => (
        <h1
          className="main-page"
          style={{
            // Apply colorText if provided, otherwise cycle through colors array for each letter
            color: colorText ? colorText : colors[index % colors.length]
          }}
          key={index}
        >
          {letter} {/* Render the individual letter */}
        </h1>
      ))}
    </div>
  )
}
