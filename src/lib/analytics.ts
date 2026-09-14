import { sendGAEvent } from "@next/third-parties/google";

/**
 * Safely dispatches a custom analytics event to Google Analytics (GA4)
 */
export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
) {
  try {
    if (typeof window !== "undefined") {
      sendGAEvent("event", eventName, params);
    }
  } catch (error) {
    // Fail silently in development/offline mode
    console.debug("[Analytics] Event tracking error:", error);
  }
}
