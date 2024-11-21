/**
 * Formats a number of followers into a human-readable string
 * Examples:
 * - 1234567 → "1.2M followers"
 * - 12345 → "12.3K followers"
 * - 1234 → "1.2K followers"
 * - 123 → "123 followers"
 * - null/undefined → "0 followers"
 * 
 * @param {number | string | null | undefined} count - The number of followers
 * @returns {string} Formatted follower count with appropriate suffix
 */
export const formatFollowers = (followers: { total: number } | number | undefined): string => {
  const count = typeof followers === 'object' ? followers?.total : followers;
  
  if (!count) return '0 followers';

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M followers`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K followers`;
  }
  return `${count} followers`;
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