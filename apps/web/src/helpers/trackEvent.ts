declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      config?: Record<string, any>
    ) => void;
  }
}

const trackEvent = (name: string) => {
  if (!window?.gtag) return;
  window.gtag("event", name);
};

export default trackEvent;
