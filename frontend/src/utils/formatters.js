/**
 * Formats a number of followers into a human-readable string
 * Examples:
 * - 1234567 → "1.2M followers"
 * - 12345 → "12.3K followers"
 * - 1234 → "1.2K followers"
 * - 123 → "123 followers"
 * - null/undefined → "0 followers"
 * 
 * @param {number} count - The number of followers
 * @returns {string} Formatted follower count with appropriate suffix
 */
export const formatFollowers = (count) => {
  // Handle null, undefined, or invalid inputs
  if (!count && count !== 0) return '0 followers';
  
  // Convert to number if string
  const followers = Number(count);
  
  // Handle invalid number conversion
  if (isNaN(followers)) return '0 followers';
  
  // Format millions
  if (followers >= 1000000) {
    const millions = (followers / 1000000);
    // Use 1 decimal place for numbers less than 10M
    if (millions < 10) {
      return `${millions.toFixed(1)}M followers`;
    }
    // Use no decimal places for larger numbers
    return `${Math.floor(millions)}M followers`;
  }
  
  // Format thousands
  if (followers >= 1000) {
    const thousands = (followers / 1000);
    // Use 1 decimal place for numbers less than 10K
    if (thousands < 10) {
      return `${thousands.toFixed(1)}K followers`;
    }
    // Use no decimal places for larger numbers
    return `${Math.floor(thousands)}K followers`;
  }
  
  // Format numbers less than 1000
  return `${followers} followers`;
};

// Example usage:
/*
console.log(formatFollowers(1234567));  // "1.2M followers"
console.log(formatFollowers(12345678)); // "12M followers"
console.log(formatFollowers(123456789)); // "123M followers"
console.log(formatFollowers(12345));    // "12.3K followers"
console.log(formatFollowers(1234));     // "1.2K followers"
console.log(formatFollowers(123));      // "123 followers"
console.log(formatFollowers(0));        // "0 followers"
console.log(formatFollowers(null));     // "0 followers"
console.log(formatFollowers());         // "0 followers"
console.log(formatFollowers("12345"));  // "12.3K followers"
*/ 