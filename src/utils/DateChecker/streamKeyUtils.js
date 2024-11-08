const { v4: uuidv4 } = require("uuid");

// Stream key expiration time (e.g., 24 hours in milliseconds)
const STREAM_KEY_EXPIRATION_MS = 24 * 60 * 60 * 1000;

/**
 * Checks if a stream key is expired.
 * @param {number} createdAt - Timestamp when the stream key was created.
 * @returns {boolean} - True if the stream key is expired, false otherwise.
 */
const isStreamKeyExpired = (createdAt) => {
  const currentTime = new Date();
  return currentTime - createdAt > STREAM_KEY_EXPIRATION_MS;
};

/**
 * Generates a new stream key.
 * @returns {string} - The generated stream key.
 */
const createStreamKey = () => {
  return uuidv4();
};

module.exports = {
  isStreamKeyExpired,
  createStreamKey,
};
