import {
  promises as fs
} from 'node:fs';

import {
  dirname
} from 'node:path';

import type {
  AppSettings
} from '../../shared/settings/schemas';

export class SettingsRepository {

  constructor(
    private readonly filePath:
      string
  ) {}
  async read():
    Promise<AppSettings | null> {
    try {
      const content =
        await fs.readFile(
          this.filePath,
          'utf-8'
        );
      return JSON.parse(
        content
      ) as AppSettings;
    }
    catch (
      error: unknown
    ) {
      if (
        this.isFileNotFoundError(
          error
        )
      ) {
        return null;
      }
      throw error;
    }
  }
  async write(
    settings:
      AppSettings
  ):
    Promise<void> {
    await fs.mkdir(
      dirname(
        this.filePath
      ),
      {
        recursive: true
      }
    );
    const json =
      JSON.stringify(
        settings,
        null,
        2
      );
    await fs.writeFile(
      this.filePath,
      json,
      'utf-8'
    );

  }
  private isFileNotFoundError(
    error: unknown
  ):
    error is NodeJS.ErrnoException {
    return (
      error instanceof Error
      &&
      'code' in error
      &&
      error.code === 'ENOENT'
    );
  }
}