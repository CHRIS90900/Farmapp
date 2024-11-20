declare global {
  interface Window {
    Telegram?: Telegram;
  }

  interface Telegram {
    WebApp: TelegramWebApp;
  }

  interface TelegramWebApp {
    initDataUnsafe: InitDataUnsafe;
    expand: () => void;
    MainButton: {
      text: string;
      show: () => void;
      hide: () => void;
      onClick: (callback: () => void) => void;
      offClick: (callback: () => void) => void;
    };
    close: () => void;
  }

  interface InitDataUnsafe {
    user?: {
      id?: string;
      username?: string;
    };
  }
}

export {};
