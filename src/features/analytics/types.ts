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
