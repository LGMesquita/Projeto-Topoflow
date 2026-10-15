import {
  appSettingsSchema,
  type AppSettings
} from '../shared/settings/schemas';

import {
  contextBridge,
  ipcRenderer
} 
from 'electron';
import {
  IPC_CHANNELS
} 
from '../shared/ipc/channels';
import {
  appVersionSchema,
  pingResponseSchema
} 
from '../shared/ipc/schemas';
import type {

  DesktopAPI,
  PingRequest
}
from '../shared/ipc/types';
const desktopAPI: DesktopAPI =
  Object.freeze({
    settings: Object.freeze({
      async get() {
        const response: unknown =
          await ipcRenderer.invoke(
            IPC_CHANNELS.SETTINGS_GET
          );
        return appSettingsSchema.parse(response);
      },
      async save(settings: AppSettings) {
        const response: unknown =
          await ipcRenderer.invoke(
            IPC_CHANNELS.SETTINGS_SAVE,
            settings
          );
        return appSettingsSchema.parse(response);
      },
    }),
    app: Object.freeze({
        async getVersion() {
          const response: unknown =
            await ipcRenderer.invoke(
              IPC_CHANNELS
                .APP_GET_VERSION
            );
          return appVersionSchema
            .parse(response);
        },
        async ping(
          input: PingRequest
        ) {
          const response: unknown =
            await ipcRenderer.invoke(
              IPC_CHANNELS
                .APP_PING,
              input
            );
          return pingResponseSchema
            .parse(response);
        },
    }),
  });
contextBridge.exposeInMainWorld(
  'desktop',
  desktopAPI
);