export interface UseGoogleAnalyticsReturn {
  init: (trackingId: string) => void;
  sendEvent: (event: any) => void;
  send: (fieldObject: any) => void;
}

export type UseGoogleAnalytics = () => UseGoogleAnalyticsReturn;

export interface GoogleAnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}
