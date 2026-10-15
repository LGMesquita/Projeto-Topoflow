import './styles.css';

import {
  themeSchema
} from '../shared/settings/schemas';

async function bootstrap():
  Promise<void> {

  const settingsForm =
    document.querySelector<
      HTMLFormElement
    >(
      '#settings-form'
    );

  const userNameInput =
    document.querySelector<
      HTMLInputElement
    >(
      '#user-name'
    );

  const themeSelect =
    document.querySelector<
      HTMLSelectElement
    >(
      '#theme'
    );

  const settingsMessage =
    document.querySelector<
      HTMLParagraphElement
    >(
      '#settings-message'
    );

settingsForm
  ?.addEventListener(
    'submit',
    async (
      event
    ) => {
      event.preventDefault();
      if (
        !userNameInput
        ||
        !themeSelect
      ) {
        return;
      }
      try {
        const saved =
          await window
            .desktop
            .settings
            .save({
              userName:
                userNameInput.value,

              theme:
  themeSchema.parse(
    themeSelect.value
  )

            });
        if (
          settingsMessage
        ) {
          settingsMessage.textContent =
            `Configurações salvas para ${saved.userName}.`;
        }
      }
      catch (
        error: unknown
      ) {

        console.error(
          error
        );

        if (
          settingsMessage
        ) {
          settingsMessage.textContent =
            'Erro ao salvar configurações.';
        }
      }
    }
  );

  const versionElement =
    document.querySelector<
      HTMLElement
    >(
      '#version'
    );

  const pingButton =
    document.querySelector<
      HTMLButtonElement
    >(
      '#ping'
    );

  const resultElement =
    document.querySelector<
      HTMLPreElement
    >(
      '#result'
    );

  const version =
    await window
      .desktop
      .app
      .getVersion();

  if (
    versionElement
  ) {
    versionElement.textContent =
      version;
  }

  pingButton
    ?.addEventListener(
      'click',
      async () => {
        try {
          const response =
            await window
              .desktop
              .app
              .ping({
                message:
                  'Olá do Renderer',
              });
          if (
            resultElement
          ) {
            resultElement.textContent =
              JSON.stringify(
                response,
                null,
                2
              );
          }
        }
        catch (
          error: unknown
        ) {
          console.error(
            error
          );
        }
      }
    );
}
void bootstrap();

function applyTheme(
  theme:
    'light'
    | 'dark'
): void {

  document
    .documentElement
    .dataset
    .theme =
      theme;

}