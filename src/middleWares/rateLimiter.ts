// src/middlewares/rateLimiter.ts
import rateLimit from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
  windowMs: 1000, // 1 seconds
  max: 60, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
