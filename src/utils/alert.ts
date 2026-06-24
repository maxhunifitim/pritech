import { Alert as RNAlert, Platform, AlertButton, AlertOptions } from 'react-native';

export const Alert = {
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions
  ): void => {
    if (Platform.OS === 'web') {
      const formattedMessage = message ? `${title}\n\n${message}` : title;
      if (buttons && buttons.length > 0) {
        const hasCancel = buttons.some(
          (btn) => btn.style === 'cancel' || btn.text?.toLowerCase() === 'cancel'
        );
        if (hasCancel || buttons.length > 1) {
          const confirmed = window.confirm(formattedMessage);
          if (confirmed) {
            const okBtn = buttons.find(
              (btn) => btn.style !== 'cancel' && btn.text?.toLowerCase() !== 'cancel'
            );
            if (okBtn && okBtn.onPress) {
              okBtn.onPress();
            }
          } else {
            const cancelBtn = buttons.find(
              (btn) => btn.style === 'cancel' || btn.text?.toLowerCase() === 'cancel'
            );
            if (cancelBtn && cancelBtn.onPress) {
              cancelBtn.onPress();
            }
          }
        } else {
          window.alert(formattedMessage);
          const firstBtn = buttons[0];
          if (firstBtn && firstBtn.onPress) {
            firstBtn.onPress();
          }
        }
      } else {
        window.alert(formattedMessage);
      }
    } else {
      RNAlert.alert(title, message, buttons, options);
    }
  },
};
