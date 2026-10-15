import {
  BrowserWindow
} from 'electron';

export function createMainWindow():
  BrowserWindow {

  const mainWindow =
    new BrowserWindow({
      width:
        1200,
      height:
        800,
      minWidth:
        800,
      minHeight:
        600,
      show:
        false,
      webPreferences: {
        contextIsolation:
          true,
        nodeIntegration:
          false,
        sandbox:
          true,
        webSecurity:
          true,
        preload:
          MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

  void mainWindow.loadURL(
    MAIN_WINDOW_WEBPACK_ENTRY
  );
  mainWindow.once(
    'ready-to-show',
    () => {
      mainWindow.show();
    }
  );
  mainWindow
    .webContents
    .setWindowOpenHandler(
      () => {
        return {
          action:
            'deny'
        };
      }
    );
  mainWindow
    .webContents
    .on(
      'will-navigate',
      (
        event
      ) => {
        event.preventDefault();
      }
    );
  return mainWindow;
}