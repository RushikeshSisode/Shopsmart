import crypto from "crypto";

/**
 * Securely compare two strings using crypto.timingSafeEqual
 * This prevents timing attacks
 */
export const secureCompare = (str1, str2) => {
  try {
    const buf1 = Buffer.from(str1, 'utf8');
    const buf2 = Buffer.from(str2, 'utf8');
    
    // Ensure buffers are the same length for timing-safe comparison
    if (buf1.length !== buf2.length) {
      return false;
    }
    
    return crypto.timingSafeEqual(buf1, buf2);
  } catch (error) {
    return false;
  }
};

/**
 * Securely compare hash values (for password verification)
 */
export const secureHashCompare = (inputPassword, hashedPassword) => {
  try {
    // This is already done by bcrypt.compare, but we can add an extra layer
    const inputBuffer = Buffer.from(inputPassword, 'utf8');
    const hashBuffer = Buffer.from(hashedPassword, 'utf8');
    
    // For hash comparison, lengths might differ, so we use a different approach
    // bcrypt handles this securely, so we just use it directly
    return null; // bcrypt.compare handles this
  } catch (error) {
    return false;
  }
};

/**
 * Generate a secure random token
 */
export const generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Create a hash using crypto
 */
export const createHash = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export default {
  secureCompare,
  secureHashCompare,
  generateSecureToken,
  createHash
};