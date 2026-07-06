export const generateEventId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "evt_" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000000000).toString(16);
};

export const fbq = (...args: any[]) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq(...args);
  } else {
    console.warn("fbq is not defined");
  }
};

/**
 * Parses _fbp and _fbc cookies if available.
 */
export const getMetaCookies = () => {
  if (typeof document === "undefined") return { fbp: undefined, fbc: undefined };
  
  const cookies = document.cookie.split(';');
  let fbp, fbc;
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') fbp = value;
    if (name === '_fbc') fbc = value;
  }
  
  return { fbp, fbc };
};

/**
 * Fires ViewContent event on Browser and Server.
 */
export const trackViewContent = async (params: { content_name: string; content_category: string }) => {
  const eventId = generateEventId();
  const eventData = {
    content_name: params.content_name,
    content_category: params.content_category,
  };

  // Browser Pixel
  fbq('track', 'ViewContent', eventData, { eventID: eventId });

  // Server CAPI
  try {
    const { fbp, fbc } = getMetaCookies();
    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "ViewContent",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: window.location.href,
        action_source: "website",
        custom_data: eventData,
        user_data: { fbp, fbc }
      }),
    });
  } catch (err) {
    console.error("Meta CAPI ViewContent error", err);
  }
};

/**
 * Fires Lead event on Browser and Server (After contact form submission).
 */
export const trackLead = async (params: { email?: string; phone?: string; [key: string]: any }) => {
  const eventId = generateEventId();

  // Advanced Matching params for Browser Pixel
  const advancedMatching: any = {};
  if (params.email) advancedMatching.em = params.email.toLowerCase().trim();
  if (params.phone) advancedMatching.ph = params.phone.replace(/\D/g, "");

  // Initialize advanced matching if provided
  if (Object.keys(advancedMatching).length > 0) {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "27322011684148956";
    fbq('init', pixelId, advancedMatching);
  }

  fbq('track', 'Lead', {}, { eventID: eventId });

  // Server CAPI
  try {
    const { fbp, fbc } = getMetaCookies();
    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: window.location.href,
        action_source: "website",
        custom_data: {},
        user_data: { 
          fbp, 
          fbc,
          email: params.email,
          phone: params.phone 
        }
      }),
    });
  } catch (err) {
    console.error("Meta CAPI Lead error", err);
  }
};

let lastContactEventTime = 0;
/**
 * Fires Contact event on Browser and Server (Debounced).
 */
export const trackContact = async (content_name: string) => {
  const now = Date.now();
  // 15 seconds debounce
  if (now - lastContactEventTime < 15000) return;
  lastContactEventTime = now;

  const eventId = generateEventId();
  const eventData = { content_name };

  fbq('track', 'Contact', eventData, { eventID: eventId });

  try {
    const { fbp, fbc } = getMetaCookies();
    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Contact",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: window.location.href,
        action_source: "website",
        custom_data: eventData,
        user_data: { fbp, fbc }
      }),
    });
  } catch (err) {
    console.error("Meta CAPI Contact error", err);
  }
};
