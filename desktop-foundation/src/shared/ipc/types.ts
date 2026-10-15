import type {
  AppSettings
} from '../settings/schemas';

import type {

  z
} from 'zod';
import type {

  pingRequestSchema,
  pingResponseSchema
} from './schemas';
export type PingRequest =
  z.infer<
    typeof pingRequestSchema
  >;
export type PingResponse =
  z.infer<
    typeof pingResponseSchema
  >;
export interface DesktopAPI {
  app: {
    getVersion():
      Promise<string>;
    ping(
      input: PingRequest
    ):
      Promise<PingResponse>;
  };
  settings: {
    get():
      Promise<AppSettings>;
    save(
      settings: AppSettings
    ):
      Promise<AppSettings>;
  };
}