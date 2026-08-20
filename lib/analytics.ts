declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type AnalyticsEvent = {
  event: string;
  [key: string]: unknown;
};

export function pushToDataLayer(data: AnalyticsEvent) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push(data);
}