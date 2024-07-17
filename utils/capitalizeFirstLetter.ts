export function capitalizeFirstLetter(input: string): string {
  if (!input) return input; // Handle empty string or null/undefined input

  // Split the input string into an array of words
  const words = input.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the capitalized words back into a string
  return capitalizedWords.join(" ");
}
