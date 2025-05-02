declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      config?: Record<string, any>
    ) => void;
  }
}

const trackEvent = (name: string, params?: Record<string, any>) => {
  if (!window?.gtag) return;
  window.gtag("event", name, params);
};

export default trackEvent;
