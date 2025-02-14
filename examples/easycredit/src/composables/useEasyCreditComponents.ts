import { useRequestURL, useShopwareContext } from "#imports";
import type {
  CheckoutEvent,
  CheckoutResponse,
  ReturnResponse,
} from "../types/easycredit";

export function useEasyCreditComponents() {
  const { apiClient } = useShopwareContext();

  const startCheckout = async (
    params: Record<string, string>,
  ): Promise<CheckoutResponse | undefined> => {
    try {
      const response = await apiClient.invoke(
        "startEasyCreditCheckout post /easycredit/init-payment",
        {
          body: params,
        },
      );
      return response as CheckoutResponse;
    } catch (error) {
      console.error("Error starting checkout:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to start checkout",
      );
    }
  };

  const checkPaymentStatus = async (): Promise<ReturnResponse | undefined> => {
    try {
      const response = await apiClient.invoke(
        "finalizeEasyCreditCheckout post /easycredit/return",
      );
      return response.data.summary;
    } catch (error) {
      // not initialized, need to start checkout first
    }
  };

  async function handleSubmit(event: CheckoutEvent): Promise<void> {
    try {
      event.preventDefault();

      const result = await startCheckout({
        ...event.detail,
        returnUrl: buildUrl("/checkout"),
      });

      const response = result?.data;

      if (!response) {
        throw new Error("No response received from checkout");
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.redirectUrl) {
        throw new Error("No redirect URL received");
      }

      window.location.href = response.redirectUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    }
  }

  const buildUrl = (endpoint: string): string => {
    const url = useRequestURL();
    return `${url.protocol}//${url.host}${endpoint}`;
  };

  return {
    startCheckout,
    checkPaymentStatus,
    handleSubmit,
    buildUrl,
  };
}
