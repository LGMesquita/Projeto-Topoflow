import type {
  BrowserWindow,
  IpcMainInvokeEvent
} from 'electron';

export function validateSender(
  event:
    IpcMainInvokeEvent,
  window:
    BrowserWindow
): void {
  if (
    window.isDestroyed()
  ) {
    throw new Error(
      'Janela destruída.'
    );
  }
  if (
    event.sender.id !==
    window.webContents.id
  ) {
    throw new Error(
      'IPC sender não autorizado.'
    );
  }
}