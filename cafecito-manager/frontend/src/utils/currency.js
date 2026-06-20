/**
 * Format an INR amount for display.
 * Prices in menuItems.js are already stored in INR.
 * e.g. 590 → "₹590"
 */
export const formatINR = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

// Alias kept for backward compatibility
export const toINR = formatINR;
