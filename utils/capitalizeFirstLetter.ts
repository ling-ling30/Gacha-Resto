export function capitalizeFirstLetter(input: string): string {
  if (!input) return input; // Handle empty string or null/undefined input
  const lowerCased = input.toLowerCase();
  return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
}
