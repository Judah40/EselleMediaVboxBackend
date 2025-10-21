/**
 * Converts a total number of seconds into a formatted duration string.
 * - If duration is < 60 seconds, it returns "SS seconds".
 * - If duration is < 60 minutes, it returns "MM:SS".
 * - If duration is >= 60 minutes, it returns "H:MM:SS".
 *
 * @param {number} totalSeconds - The total duration in seconds.
 * @returns {string} The formatted duration string.
 */
exports.formatDuration = (totalSeconds) => {
  // 1. Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // 2. Helper function to pad single-digit numbers (e.g., 5 -> "05")
  const pad = (num) => String(num).padStart(2, "0");

  // 3. Conditional Formatting
  if (hours > 0) {
    // Output: H:MM:SS (e.g., 1:05:30)
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  } else if (minutes > 0) {
    // Output: MM:SS (e.g., 5:30)
    return `${minutes}:${pad(seconds)}`;
  } else {
    // Output: Seconds (e.g., 30 seconds)
    // We use the full word 'seconds' here for clarity when it's the only unit.
    return `${seconds} seconds`;
  }
};
