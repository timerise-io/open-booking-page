export interface UseGoogleAnalyticsReturn {
  init: (trackingId: string) => void;
  sendEvent: (event: GoogleAnalyticsEvent) => void;
  send: (path: any) => void;
}

export type UseGoogleAnalytics = () => UseGoogleAnalyticsReturn;

export interface GoogleAnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface UseGTMReturn {
  init: (trackingId: string) => void;
  action: (event: GoogleTagManagerEvent) => void;
}

export type UseGTM = () => UseGTMReturn;

export interface GoogleTagManagerEvent {
  [key: string]: unknown;
  event: string;
}
