import {
  z
} from 'zod';
export const pingRequestSchema =
  z.object({
    message:
      z
        .string()
        .trim()
        .min(1)
        .max(200),
  });
export const pingResponseSchema =
  z.object({
    echo:
      z.string(),

    timestamp:
      z.string(),
  });
export const appVersionSchema =
  z.string();