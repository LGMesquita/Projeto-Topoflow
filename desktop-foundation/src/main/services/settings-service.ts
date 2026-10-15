import type {
  AppSettings
} from '../../shared/settings/schemas';

import {
  appSettingsSchema
} from '../../shared/settings/schemas';

import type {
  SettingsRepository
} from '../repositories/settings-repository';

export class SettingsService {
  private readonly defaultSettings:
    AppSettings =
    {
      userName:
        'Usuário',
      theme:
        'dark'
    };
  constructor(
    private readonly repository:
      SettingsRepository
  ) {}
  async get():
    Promise<AppSettings> {
    const stored =
      await this.repository.read();
    if (!stored) {
      return this.defaultSettings;
    }
    return appSettingsSchema.parse(
      stored
    );
  }
  async save(
    input: unknown
  ):
    Promise<AppSettings> {
    const settings =
      appSettingsSchema.parse(
        input
      );
    await this.repository.write(
      settings
    );
    return settings;
  }
}