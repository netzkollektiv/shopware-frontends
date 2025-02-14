export interface CheckoutEvent extends Event {
  detail: Record<string, unknown>;
}

export interface CheckoutResponse {
  error?: string;
  redirectUrl?: string;
  data?: {
    error?: string;
    redirectUrl?: string;
  };
}

export interface ReturnResponse {
  data?: {
    summary?: string;
  };
}
