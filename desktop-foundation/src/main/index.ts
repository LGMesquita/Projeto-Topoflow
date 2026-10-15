import {
  app,
  BrowserWindow,
  session
} from 'electron';
import {

  createMainWindow
} from './windows/main-window';
import {

  registerIpcHandlers
} from './ipc/register-ipc';
let mainWindow:
  BrowserWindow | null =
    null;

import {
  join
} from 'node:path';

import {
  SettingsRepository
} from './repositories/settings-repository';

import {
  SettingsService
} from './services/settings-service';


async function bootstrap():
  Promise<void> {

  await app.whenReady();

  session
    .defaultSession
    .setPermissionRequestHandler(
      (
        _webContents,
        _permission,
        callback
      ) => {
        callback(false);
      }
    );
  const settingsRepository =
    new SettingsRepository(
      join(app.getPath('userData'), 'settings.json')
    );
  const settingsService =
    new SettingsService(settingsRepository);
  registerIpcHandlers({
    getMainWindow: () => mainWindow,
    settingsService
  });
  mainWindow =
    createMainWindow();
  mainWindow.on(
    'closed',
    () => {
      mainWindow =
        null;
    }
  );
  app.on(
    'activate',
    () => {
      if (
        BrowserWindow
          .getAllWindows()
          .length === 0
      ) {
        mainWindow =
          createMainWindow();
      }
    }
  );
}
void bootstrap()
  .catch(
    (
      error: unknown
    ) => {
      console.error(
        'Erro ao iniciar aplicação:',
        error
      );
      app.quit();
    }
  );
app.on(
  'window-all-closed',
  () => {
    if (
      process.platform !==
      'darwin'
    ) {
      app.quit();
    }
  }
);