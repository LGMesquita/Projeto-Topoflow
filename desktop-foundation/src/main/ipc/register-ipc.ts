import type {
  SettingsService
} from '../services/settings-service';

// Electron is provided by the desktop runtime; its types may be unavailable in this build environment.
// @ts-expect-error Electron declarations are supplied by the packaged desktop app.
import { ipcMain, type BrowserWindow, type IpcMainInvokeEvent } from 'electron';

import {
  IPC_CHANNELS
} from '../../shared/ipc/channels';

import {
  pingRequestSchema
} from '../../shared/ipc/schemas';

import {
  validateSender
} from './validate-sender';
export function registerIpcHandlers(

{ getMainWindow, settingsService }: { getMainWindow: () => BrowserWindow | null; settingsService: SettingsService; }
): void {

  ipcMain.handle(

    IPC_CHANNELS.APP_PING,
    (
      event: IpcMainInvokeEvent,
      rawInput: unknown
    ) => {
      const window =
        getMainWindow();
      if (!window) {
        throw new Error(
          'Janela principal indisponível.'
        );
      }
      validateSender(
        event,
        window
      );
      const input =
        pingRequestSchema
          .parse(
            rawInput
          );

      return {
        echo:
          input.message,

        timestamp:
          new Date()
            .toISOString(),
      };
    }
  );
ipcMain.handle(

  IPC_CHANNELS.SETTINGS_SAVE,

  async (
    event: IpcMainInvokeEvent,
    rawInput: unknown
  ) => {

    const window =
      getMainWindow();


    if (!window) {

      throw new Error(
        'Janela principal indisponível.'
      );

    }


    validateSender(
      event,
      window
    );


    return settingsService.save(
      rawInput
    );

  }

);
}