import {
  z
} from 'zod';



export const themeSchema =
  z.enum([
    'light',
    'dark'
  ]);

export const appSettingsSchema =
  z.object({

    userName:
      z
        .string()
        .trim()
        .min(1)
        .max(100),

      theme:
        themeSchema
      });

export type AppSettings =
  z.infer<
    typeof appSettingsSchema
  >;